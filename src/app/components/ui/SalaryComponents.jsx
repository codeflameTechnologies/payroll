import {
  Plus,
  Trash2,
} from "lucide-react";

export default function SalaryComponents({
  title,
  data,
  setData,
}) {
  const add = () => {
    setData([
      ...data,
      {
        id: data.length+1,
        name: "",
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

  const remove = (id) => {
    setData(
      data.filter(
        (i) => i.id !== id
      )
    );
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-lg">
          {title}
        </h3>

        <button
          onClick={add}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {data.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-4 gap-4 mb-3"
        >
          <input
            className="input"
            placeholder="Name"
            value={item.name}
            onChange={(e) =>
              update(
                item.id,
                "name",
                e.target.value
              )
            }
          />

         

         

          <button
            onClick={() =>
              remove(item.id)
            }
            
          >
            <Trash2
              className="mx-auto text-red-600"
            />
          </button>
        </div>
      ))}
    </div>
  );
}