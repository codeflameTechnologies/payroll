import {
  Plus,
  Trash2,
} from "lucide-react";

export default function LeavePolicy({
  data,
  setData,
}) {

 
  const add = () => {
    setData([
      ...data,
      {
        id: data.length+1,
        name: "",
        days: "",
        paid: true,
      },
    ]);
  };


const update = (
    id,
    field,
    value
  ) => {
    setData(
      data.map((i) =>
        i.id === id
          ? {
              ...i,
              [field]: value,
            }
          : i
      )
    );
  };









  return (
    <div className="mb-10">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-lg">
          Leave Policies
        </h3>

        <button
          onClick={add}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus />
        </button>
      </div>

      {data.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-4 gap-4 mb-3"
        >
          <input
            className="input"
            placeholder="Leave Name"
            value={item.name}
            onChange={(e) =>
              update(
                item.id,
                "name",
                e.target.value
              )
            }
          />

          <input
            className="input"
            placeholder="Days"
            value={item.days}
            onChange={(e) =>
              update(
                item.id,
                "days",
                e.target.value
              )
            }
          
          />

          <select 
           className="input"
           value={item.paid}
           onChange={(e) =>
             update(
               item.id,
               "paid",
               e.target.value
             )
           }
          >
            <option value={true}>
              Paid
            </option>
            <option value={false}>
              Unpaid
            </option>
          </select>

          <button className="bg-red-100 rounded-lg">
            <Trash2 className="mx-auto text-red-600" />
          </button>
        </div>
      ))}
    </div>
  );
}