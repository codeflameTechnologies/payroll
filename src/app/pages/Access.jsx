import { useState } from "react";
import {
  ShieldCheck,
  Plus,
  Search,
  Trash2,
  Mail,
  Check,
} from "lucide-react";



export default function Access() {
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [accessList, setAccessList] = useState([
    {
      id: 1,
      email: "hr@company.com",
      permissions: ["Dashboard", "Employees", "Attendance"],
    },
  ]);

  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(
        selectedFeatures.filter((f) => f !== feature)
      );
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const addAccess = () => {
    if (!email.trim()) return;

    setAccessList([
      ...accessList,
      {
        id: Date.now(),
        email,
        permissions: selectedFeatures,
      },
    ]);

    setEmail("");
    setSelectedFeatures([]);
  };

  const removeAccess = (id) => {
    setAccessList(accessList.filter((item) => item.id !== id));
  };

  const filteredData = accessList.filter((item) =>
    item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* Header */}

      <div className="flex items-center gap-3">
        <ShieldCheck className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold">
            Access Management
          </h1>

          <p className="text-gray-500">
            Give feature access to employees by email.
          </p>
        </div>
      </div>

      {/* Add Card */}

      <div className="rounded-xl border bg-white p-5">

        <h2 className="font-semibold mb-4">
          Grant Access
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">

          <div>
            <label className="text-sm font-medium">
              Employee Email
            </label>

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
            <label className="text-sm font-medium">
              Select Permissions
            </label>

            <div className="grid grid-cols-2 gap-2 mt-2">

              {FEATURES.map((feature) => (

                <button
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`border rounded-lg p-2 text-sm flex items-center justify-between transition
                  ${
                    selectedFeatures.includes(feature)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {feature}

                  {selectedFeatures.includes(feature) && (
                    <Check size={16} />
                  )}
                </button>

              ))}

            </div>
          </div>

        </div>

        <button
          onClick={addAccess}
          className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Grant Access
        </button>

      </div>

      {/* Search */}

      <div className="relative max-w-md">

        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search email..."
          className="border rounded-lg w-full pl-10 pr-3 py-2"
        />

      </div>

      {/* Table */}

      <div className="rounded-xl border overflow-hidden bg-white">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Permissions</th>
              <th className="text-center p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredData.map((item) => (

              <tr key={item.id} className="border-t">

                <td className="p-4">
                  {item.email}
                </td>

                <td className="p-4">

                  <div className="flex flex-wrap gap-2">

                    {item.permissions.map((permission) => (

                      <span
                        key={permission}
                        className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs"
                      >
                        {permission}
                      </span>

                    ))}

                  </div>

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => removeAccess(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}