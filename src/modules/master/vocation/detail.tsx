/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import NameAvatar from "../../../components/reusables/Avatar/NameAvatar";
import BackLayout from "../../../components/reusables/Layout/BackLayout";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { HttpGet, HttpPost } from "../../../config/api";
import { settings } from "../../../config/theme/constants";
import TextButton from "../../../components/reusables/Button/TextButton";
import VerificationModal from "../../../components/reusables/Modal/VerificationModal";
import ClassCard from "../../../components/reusables/Card/ClassCard";
import ActivityCard from "../../../components/reusables/Card/ActivityCard";
import UploadImageModal from "../../../components/reusables/Modal/UploadImage";

function DetailVocation() {
  const [vocation, setVocation] = useState(null);
  const [ktp, setKtp] = useState(null);
  const [legal, setLegal] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [vocatioClass, setVocationClass] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [openUploadImageModal, setOpenUploadImageModal] = useState(false);
  const [file, setFile] = useState("");
  const [type, setType] = useState("");
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
      }

      let resEvents = await HttpPost('galleries/', {
        limit: 5,
        start: 0,
        method: 'partial',
        name: '',
        vocationId: param.id
      }, null);

      let resClasses = await HttpPost(`classes/vocation/${param.id}`, {
        limit: 5,
        start: 0,
        name: '',
      }, null);

      let resSocialMedia = await HttpGet(`socials/${param.id}`, null);

      setVocationClass(resClasses.rows);
      setEvents(resEvents.rows);
      setSocialMedia(resSocialMedia);
      setVocation(res);
      setCategories(res.categories);
    } catch (error) {
      toast(error?.message);
    }
  }

  async function resetPassword({email}){
    try {
      await HttpPost('internal/auth/reset-password', {
        email
      }, null);
  
      toast('Success reset password!')
    } catch (error) {
      toast(error?.message);
    }
  }

  useEffect(() => {
    getVocationDetail();
  }, []);

  return (
    <div className="overflow-y-auto max-h-[95vh]">
      <UploadImageModal
        open={openUploadImageModal}
        vocationId={param.id}
        fileId={file}
        type={type}
        onClick={() => {
          getVocationDetail();
          setOpenUploadImageModal(false);
        }}
      />
      {/* <BackLayout navigation={"/vocations/list"} /> */}
      <div className="p-4">
        <div onClick={() => {
          setOpenUploadImageModal(true);
          setFile("");
          setType("Photo Profil")
        }}>
          {vocation?.photoProfile ? (
            <img
              src={`${settings.baseUrl}${vocation?.photoProfile?.replace('public/', "")}`}
              className="h-[90px] w-[90px] rounded-full object-fill mx-auto"
              alt={`Profile ${vocation?.name}`}
            />
          ) : (
            <NameAvatar name={vocation?.name ?? ""} middle={true} />
          )}
          <div>
            <h4 className="text-center font-bold mt-3">{vocation?.name}</h4>
          </div>
          <div className="flex justify-center items-center gap-2 mt-2">
            {categories?.map((category) => {
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
        <div className="mt-5 mb-3 grid grid-cols-4">
          <div className="flex flex-col justify-between gap-2 items-center">
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
          <div className="flex flex-col justify-between gap-2 items-center">
            <p className="text-sm font-bold">KTP</p>
            {ktp ? (
              <a
                className="py-1 px-3 bg-green-500 text-xs text-white rounded-full"
                href={`${settings.baseUrl}${ktp?.image.replace('public/', "")}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            ) : (
              <div onClick={() => {
                setOpenUploadImageModal(true);
                setFile(ktp ? ktp?.id : "");
                setType("KTP")
              }} className="py-1 px-3 bg-red-500 text-xs text-white rounded-full">
                <p>No Document</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between gap-2 items-center">
            <p className="text-sm font-bold">Legal Document</p>
            {legal ? (
              <a
                className="py-1 px-3 bg-green-500 text-xs text-white rounded-full"
                href={`${settings.baseUrl}${legal?.image.replace('public/', "")}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            ) : (
              <div onClick={() => {
                setOpenUploadImageModal(true);
                setFile(ktp ? ktp?.id : "");
                setType("Legal Dokumen")
              }} className="py-1 px-3 bg-red-500 text-xs text-white rounded-full">
                <p>No Document</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between gap-2 items-center">
            <p className="text-sm font-bold">Certificate Design</p>
            {certificate ? (
              <a
                className="py-1 px-3 bg-green-500 text-xs text-white rounded-full"
                href={`${settings.baseUrl}${certificate?.image.replace('public/', "")}`}
                target="_blank"
                rel="noreferrer"
              >
                View
              </a>
            ) : (
              <div onClick={() => {
                setOpenUploadImageModal(true);
                setFile(ktp ? ktp?.id : "");
                setType("Desain Sertifikat")
              }} className="py-1 px-3 bg-red-500 text-xs text-white rounded-full">
                <p>No Document</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10 max-w-[250px] mx-auto">
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
        <div className="grid grid-cols-2 my-5">
          <div>
            <p className="font-bold my-2">Commision</p>
            <p>{vocation?.commission ?? '-'}</p>
          </div>
          <div>
            <p className="font-bold my-2">Commision Type</p>
            <p className="capitalize">{vocation?.commissionType ? vocation?.commissionType : "-"}</p>
          </div>
        </div>
        <div className="mt-5">
          <p className="capitalize font-bold">Address</p>
          <div className="my-2">
            <p>{vocation?.completeAddress}</p>
          </div>
          <div className="flex gap-5">
            <div>
              <p className="font-bold my-2">City</p>
              <p>{vocation?.location?.cityName}</p>
            </div>
            <div>
              <p className="font-bold my-2">Province</p>
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
              <p className="font-bold my-2">Phone 1</p>
              <p>{vocation?.phoneFirst ? vocation?.phoneFirst : "N/A"}</p>
            </div>
            <div>
              <p className="font-bold my-2">Phone 2</p>
              <p>{vocation?.phoneSecond ? vocation?.phoneSecond : "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 my-2" />
        <div>
          <p className="capitalize font-bold">Social Media</p>
          {
            socialMedia?.map((data: any) => {
              return (
                <div className="mt-1 mb-2 flex gap-3 items-center">
                  <p className="font-bold my-2 capitalize">{data?.type}</p>
                  <a href={ !data?.url.match(/^https?:\/\//i) ? `https://${data?.url}` : data?.url} target="_blank" rel="noreferrer" className="text-center border-b-2 border-blue-600 text-blue-600">View</a>
                </div>
              )
            })
          }
        </div>
        <div className="border border-gray-300 my-2" />
        <div>
          <p className="capitalize font-bold">PIC Name</p>
          <div className="mt-1 mb-2">
            <p>{vocation?.cpName}</p>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <p className="font-bold my-2">PIC Email</p>
              <p>{vocation?.cpEmail}</p>
            </div>
            <div>
              <p className="font-bold my-2">PIC Phone</p>
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
                  <div className="max-w-[150px]">
                    <TextButton title="Reset Password" onClick={() => resetPassword({
                      email: data?.account?.email
                    })} disable={false} />
                  </div>
                </div>
              )
            })
          }

        </div>
        <div className="border border-gray-300 my-2" />
        <div className="mt-3">
          <div className="flex justify-between items-center mb-3">
            <p className="capitalize font-bold">Class</p>
            <a href={`/classes/vocation/${param.id}`}>
              <p className="text-xs cursor-pointer">View All</p>
            </a>
          </div>
          <div className="flex flex-row justify-center gap-3">
            {
              vocatioClass.length > 0 ? vocatioClass?.map((data) => {
                return (
                  <ClassCard
                    key={data.id}
                    maxStudent={data.maxPerson}
                    isPrivate={data.isPrivate}
                    price={data.price}
                    title={data.name}
                    duration={`${data.duration} ${data.durationType}`}
                    openRegis={data.openRegis}
                    closeRegis={data.closeRegis}
                    startClass={data.classStart}
                    crowdfunding={0}
                    totalStudent={0}
                    categories={data.categories}
                    detailClick={() => null}
                    deleteClick={() => null}
                    editCategoryClick={() => null}
                  />
                )
              }) : <div className="min-h-[150px] flex justify-center items-center">
                <p className="text-center font-semibold">No Class</p>
              </div>
            }
          </div>
        </div>
        <div className="py-3">
          <div className="flex justify-between items-center mb-3">
            <p className="capitalize font-bold">Event</p>
            <a href={`/vocations/event/${param.id}`}>
              <p className="text-xs">View All</p>
            </a>
          </div>
          {
            events.length > 0 ? <div className="grid grid-cols-5 gap-3">
              {
                events?.map((data) => {
                  return (
                    <ActivityCard
                      key={data.id}
                      name={data.name}
                      eventDate={data.date}
                      image={data.image}
                      editMode={false}
                      remove={null}
                      edit={null}
                    />
                  )
                })
              }
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
