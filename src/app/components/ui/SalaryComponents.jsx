import { Plus, Trash2 } from "lucide-react";

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
        code: "",
        name: "",
        calculationType: "fixed",
        basedOn: "gross",
        value: 0,
        prorata: false,
        taxable: true,
      },
    ]);
  };

  const update = (id, field, value) => {
    setData(
      data.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const remove = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">{title}</h3>

        <button
          onClick={add}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      {/* Header */}

      <div className="grid grid-cols-8 gap-3 font-semibold text-sm border-b pb-2 mb-3">
        <div>Name</div>
        <div>Type</div>
        <div>Based On</div>
        <div>Value</div>
        <div className="text-center">Prorata</div>
        <div className="text-center">Tax</div>
        <div></div>
      </div>

      {data.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-8 gap-3 items-center mb-3"
        >
          {/* Name */}

          <input
            className="input"
            placeholder="Name"
            value={item.name}
            onChange={(e) => {
              update(item.id, "name", e.target.value);
            }}
          />

          {/* Type */}

          <select
            className="input"
            value={item.calculationType}
            onChange={(e) =>
              update(
                item.id,
                "calculationType",
                e.target.value
              )
            }
          >
            <option value="fixed">Fixed</option>
            <option value="percentage">
              Percentage
            </option>
          </select>

         <select
            className="input"
            value={item.basedOn}
            onChange={(e) =>
              update(
                item.id,
                "basedOn",
                e.target.value
              )
            }
          >
            <option value="gross">
              Gross
            </option>

            <option value="basic">
              Basic
            </option>
          </select>
         

          {/* Value */}

          <input
            type="number"
            className="input"
            value={item.value}
            onChange={(e) =>
              update(
                item.id,
                "value",
                Number(e.target.value)
              )
            }
          />

          {/* Prorata */}

          <div className="flex justify-center">
            <input
              type="checkbox"
              checked={item.prorata}
              onChange={(e) =>
                update(
                  item.id,
                  "prorata",
                  e.target.checked
                )
              }
            />
          </div>

          

          {/* Tax */}

          <div className="flex justify-center">
            <input
              type="checkbox"
              checked={item.taxable}
              onChange={(e) =>
                update(
                  item.id,
                  "taxable",
                  e.target.checked
                )
              }
            />
          </div>

          {/* Delete */}

          <button
            onClick={() => remove(item.id)}
          >
            <Trash2 className="mx-auto text-red-600" />
          </button>
        </div>
      ))}
    </div>
  );
}