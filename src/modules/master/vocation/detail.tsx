/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import NameAvatar from "../../../components/reusables/Avatar/NameAvatar";
import BackLayout from "../../../components/reusables/Layout/BackLayout";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { HttpGet, HttpPost } from "../../../config/api";
import { settings } from "../../../config/theme/constants";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import TextButton from "../../../components/reusables/Button/TextButton";
import VerificationModal from "../../../components/reusables/Modal/VerificationModal";
import ClassCard from "../../../components/reusables/Card/ClassCard";
import ActivityCard from "../../../components/reusables/Card/ActivityCard";

function DetailVocation() {
  const [vocation, setVocation] = useState(null);
  const [ktp, setKtp] = useState(null);
  const [legal, setLegal] = useState(null);
  const [photoProfile, setPhotoProfile] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [vocatioClass, setVocationClass] = useState([]);
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const param = useParams();

  async function getVocationDetail() {
    try {
      let res = await HttpGet(`vocations/${param.id}`, null);
      let resUser = await HttpGet(`internal/users/vocation/${param.id}`, null);

      res.accounts = resUser;

      for (let data of res?.documents) {
        if (data.documentType === "identification") setKtp(data);
        else if (data.documentType === "legal-document") setLegal(data);
        else if (data.documentType === "certificate-design")
          setCertificate(data);
        else if (data.documentType === "photo-profile") setPhotoProfile(data);
      }

      let resEvents = await HttpPost('galleries/', {
        limit: 5,
        start: 0,
        method: 'partial',
        name: '',
        vocationId: param.id
      }, null);

      // let resClasses = await HttpPost(`classes/vocation/${param.id}`, {
      //   limit: 5,
      //   start: 0,
      //   name: '',
      // }, null);

      // setVocationClass(resClasses);
      setEvents(resEvents);
      setVocation(res);
      setCategories(res.category);
    } catch (error) {
      toast(error?.message);
    }
  }

  useEffect(() => {
    getVocationDetail();
  }, []);

  return (
    <div>
      <BackLayout navigation={"/vocations/list"} />
      <div className="p-4">
        <div>
          {photoProfile ? (
            <img
              src={`${settings.baseUrl}${photoProfile?.image}`}
              className="h-[90px] rounded-full bg-center bg-cover mx-auto"
              alt={`Profile ${vocation?.name}`}
            />
          ) : (
            <NameAvatar name={vocation?.name ?? ""} middle={true} />
          )}
          <div>
            <h4 className="text-center font-bold mt-3">{vocation?.name}</h4>
          </div>
          <div className="flex justify-center items-center gap-2 mt-2">
            {categories.map((category) => {
              return (
                <div className="rounded-full py-1 px-3 bg-slate-400">
                  <p className="capitalize text-xs text-white">
                    {category?.category?.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-5 mb-3">
          <div className="flex justify-between items-center my-2">
            <p className="text-sm font-bold">Status</p>
            {vocation?.verified ? (
              <div className="py-1 px-3 bg-green-500 text-xs text-white rounded-full">
                <p>Verified</p>
              </div>
            ) : (
              <div className="py-1 px-3 bg-red-500 text-xs text-white rounded-full">
                <p>Unverified</p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">KTP</p>
            {ktp ? (
              <a
                className="py-1 px-3 bg-green-500 text-xs text-white rounded-full"
                href={`${settings.baseUrl}${ktp?.image}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            ) : (
              <div className="py-1 px-3 bg-red-500 text-xs text-white rounded-full">
                <p>No Document</p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center my-2">
            <p className="text-sm font-bold">Legal Document</p>
            {legal ? (
              <a
                className="py-1 px-3 bg-green-500 text-xs text-white rounded-full"
                href={`${settings.baseUrl}${legal?.image}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            ) : (
              <div className="py-1 px-3 bg-red-500 text-xs text-white rounded-full">
                <p>No Document</p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold">Certificate Design</p>
            {certificate ? (
              <a
                className="py-1 px-3 bg-green-500 text-xs text-white rounded-full"
                href={`${settings.baseUrl}${certificate?.image}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            ) : (
              <div className="py-1 px-3 bg-red-500 text-xs text-white rounded-full">
                <p>No Document</p>
              </div>
            )}
          </div>
          <div className="mt-3">
            <TextButton
              title={`${vocation?.verified ? "Redo Verification" : "Verification"
                }`}
              onClick={() => setOpenVerificationModal(!openVerificationModal)}
              disable={false}
            />
          </div>
          <VerificationModal
            vocationName={vocation?.name}
            vocationId={param?.id}
            open={openVerificationModal}
            section={vocation?.verified ? "redo" : "create"}
            onAccept={() => {
              setOpenVerificationModal(false)
              getVocationDetail()
            }}
            onCancel={() => setOpenVerificationModal(false)}
          />
        </div>
        <div className="mt-5">
          <p className="capitalize font-bold">Address</p>
          <div className="my-2">
            <p>{vocation?.completeAddress}</p>
          </div>
          <div className="flex gap-5">
            <div>
              <p className="font-bold">City</p>
              <p>{vocation?.location?.cityName}</p>
            </div>
            <div>
              <p className="font-bold">Province</p>
              <p>{vocation?.location?.provinceName}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 my-2" />
        <div>
          <p className="capitalize font-bold">Email</p>
          <div className="mt-1 mb-2">
            <p>{vocation?.emailVocation}</p>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="font-bold">Phone 1</p>
              <p>{vocation?.phoneFirst}</p>
            </div>
            <div>
              <p className="font-bold">Phone 2</p>
              <p>{vocation?.phoneSecond ? vocation?.phoneSecond : "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 my-2" />
        <div>
          <p className="capitalize font-bold">PIC Name</p>
          <div className="mt-1 mb-2">
            <p>{vocation?.cpName}</p>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="font-bold">PIC Email</p>
              <p>{vocation?.cpEmail}</p>
            </div>
            <div>
              <p className="font-bold">PIC Phone</p>
              <p>{vocation?.cpPhone}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 my-2" />
        <div>
          <p className="capitalize font-bold">Account</p>

          {
            vocation?.accounts?.map((data) => {
              return (
                <div className="grid grid-cols-2 items-center">
                  <div>
                    <p>{data?.account?.email}</p>
                  </div>
                  <TextButton title="Reset Password" onClick={() => null} disable={false} />
                </div>
              )
            })
          }

        </div>
        <div className="border border-gray-300 my-2" />
        <div className="mt-3">
          <div className="flex justify-between items-center mb-3">
            <p className="capitalize font-bold">Class</p>
            <p className="text-xs">View All</p>
          </div>
          <div className="flex flex-col gap-3">
            {
              vocatioClass.length > 0 ? null : <div className="min-h-[150px] flex justify-center items-center">
                <p className="text-center font-semibold">No Class</p>
              </div>
            }
            {/* <ClassCard
              detailClick={() => null}
              deleteClick={() => null}
              categories={categories}
              title="Fullstack Javascript Immersive Bootcamp"
              totalStudent={0}
              duration={"10 Months"}
              crowdfunding={2}
              openRegis={"2022-10-21"}
              closeRegis={"2022-10-21"}
              startClass={"2022-10-21"}
            />
            <ClassCard
              detailClick={() => null}
              deleteClick={() => null}
              categories={categories}
              title="Fullstack Javascript Immersive Bootcamp"
              totalStudent={0}
              duration={"10 Months"}
              crowdfunding={2}
              openRegis={"2022-10-21"}
              closeRegis={"2022-10-21"}
              startClass={"2022-10-21"}
            /> */}
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-center mb-3">
            <p className="capitalize font-bold">Event</p>
            <p className="text-xs">View All</p>
          </div>

          {
            events.length > 0 ? <div className="grid grid-cols-2 gap-3">
              {/* <ActivityCard />
            <ActivityCard /> */}
            </div> : <div className="min-h-[150px] flex justify-center items-center">
              <p className="text-center font-semibold">No Event</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default DetailVocation;
