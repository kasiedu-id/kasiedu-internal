import { useEffect, useState } from "react";
import { InputSingleField } from "../Field/InputField";
import { DropdownField } from "../Field/DropdownField";
import { HttpPut } from "../../../config/api";
import { toast } from "react-toastify";
import { IconField } from "../Field/IconField";
import TextButton from "../Button/TextButton";
import GeneralButton from "../Button/GeneralButton";

function VerificationModal({
  open,
  onCancel,
  vocationName,
  vocationId,
  section,
  onAccept,
}) {
  const [commission, setCommission] = useState("");
  const [commissionType, setCommissionType] = useState(null);

  const dropdownCommissionType = [
    {
      id: 1,
      value: "percent",
    },
    {
      id: 2,
      value: "amount",
    },
  ];

  async function verification() {
    try {
      if (section === 'create') {
        await HttpPut(`internal/vocations/verification/${vocationId}`, {
          commission: commission,
          commissionType: commissionType
        }, null);

        toast("Success verified vocation!");
      } else {
        await HttpPut(`internal/vocations/verification/${vocationId}`, {
          commission: null,
          commissionType: null
        }, null);

        toast("Success revoke verification vocation!");
      }

      onAccept();
    } catch (error) {
      toast(error.message)
    }
  }

  useEffect(() => {
    setCommission("");
    setCommissionType(null);
  }, [open])

  return (
    <div
      className={`fixed ${open ? "" : "hidden"
        } z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mx-auto`}
    >
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg max-w-[550px] rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg text-center leading-6 font-medium text-gray-900">
            {section === "create" ? "Verification " : "Redo Verification "}
          </h3>
          <h2 className="text-2xl mt-3 text-center leading-6 font-bold text-gray-700">
            {vocationName}
          </h2>
          <div className="mt-2 py-3">
            <p className="text-sm text-gray-500 text-center">
              Are you sure want to verify this vocation ?
            </p>
          </div>
          {section === "create" ?
            <div>
              <div className="my-2">
                <IconField
                  placeholder={"Amount Commission"}
                  type={"text"}
                  textColor={null}
                  label={""}
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                />
              </div>
              <DropdownField
                required={false}
                value={commissionType}
                valueField={"value"}
                collectionList={dropdownCommissionType}
                labelField={"value"}
                keyField={"id"}
                placeholder={"Commission Type"}
                label={""}
                onChange={(e) => setCommissionType(e.target.value)}
              />
            </div>
            : null
          }
          <div className="grid grid-cols-2 gap-4">
            <TextButton onClick={() => verification()} title="Yes" disable={false} />
            <GeneralButton onClick={onCancel} title="Cancel" bgColor="bg-white" textColor={"text-black"} icon={null} disable={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationModal;
