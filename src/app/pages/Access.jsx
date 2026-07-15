import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  ShieldCheck,
  Plus,
  Search,
  Trash2,
  Mail,
  Check,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";

const FEATURES = ["Dashboard", "Employees", "Attendance", "Payroll", "Reports", "Settings"];
const PERMISSIONS_STORAGE_KEY = "payroll_access_permissions";

const getStoredPermissions = () => {
  try {
    return JSON.parse(localStorage.getItem(PERMISSIONS_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};



export default function Access() {
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingIds, setDeletingIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAccess();
  }, []);

  const getToken = () => {
    const token = localStorage.getItem("codeflame_payroll2003");
    if (!token) {
      toast.error("Please login again to continue.");
      navigate("/");
      throw new Error("No token");
    }

    return token;
  };

  const loadAccess = async () => {
    setLoading(true);

    try {
      const token = getToken();
      const response = await axios.get("https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/access", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const storedPermissions = getStoredPermissions();
      const mappedAccess = (response.data?.data || []).map((item) => ({
        id: item._id,
        email: item.email,
        permissions: storedPermissions[item.email] || [],
      }));

      setAccessList(mappedAccess);
    } catch (error) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to load access records.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((item) => item !== feature)
        : [...prev, feature]
    );
  };

  const addAccess = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter an employee email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const token = getToken();
      const response = await axios.post(
        "https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/access",
        { email: trimmedEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const storedPermissions = getStoredPermissions();
      storedPermissions[trimmedEmail] = selectedFeatures;
      localStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(storedPermissions));

      setAccessList((prev) => [
        {
          id: response.data?.data?._id || Date.now(),
          email: trimmedEmail,
          permissions: selectedFeatures,
        },
        ...prev,
      ]);

      setEmail("");
      setSelectedFeatures([]);
      toast.success(response.data?.message || "Access granted successfully.");
    } catch (error) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to create access record.");
    } finally {
      setSubmitting(false);
    }
  };

  const removeAccess = async (id) => {
    const target = accessList.find((item) => item.id === id);
    if (!target) return;

    setDeletingIds((prev) => [...prev, id]);

    try {
      const token = getToken();
      await axios.delete(`https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/access/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const storedPermissions = getStoredPermissions();
      delete storedPermissions[target.email];
      localStorage.setItem(PERMISSIONS_STORAGE_KEY, JSON.stringify(storedPermissions));

      setAccessList((prev) => prev.filter((item) => item.id !== id));
      toast.success("Access removed successfully.");
    } catch (error) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to remove access record.");
    } finally {
      setDeletingIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const filteredData = accessList.filter((item) =>
    item.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold">Access Management</h1>
          <p className="text-gray-500">Give feature access to employees by email.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <h2 className="font-semibold mb-4">Grant Access</h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Employee Email</label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="employee@company.com"
                className="w-full border rounded-lg pl-10 pr-3 py-2 outline-none"
              />
            </div>
          </div>

          <div>
           
          </div>
        </div>

        <button
          type="button"
          onClick={addAccess}
          disabled={submitting}
          className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg"
        >
          {submitting ? <LoaderCircle className="animate-spin" size={18} /> : <Plus size={18} />}
          {submitting ? "Granting..." : "Grant Access"}
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search email..."
          className="border rounded-lg w-full pl-10 pr-3 py-2"
        />
      </div>

      <div className="rounded-xl border overflow-hidden bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-10 text-gray-500">
            <LoaderCircle className="mr-2 animate-spin" size={18} />
            Loading access records...
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Email</th>
                
                <th className="text-center p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-500">
                    No access records found.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">{item.email}</td>
                    
                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={() => removeAccess(item.id)}
                        disabled={deletingIds.includes(item.id)}
                        className="text-red-500 hover:text-red-700 disabled:text-red-300"
                      >
                        {deletingIds.includes(item.id) ? (
                          <LoaderCircle className="animate-spin" size={18} />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}