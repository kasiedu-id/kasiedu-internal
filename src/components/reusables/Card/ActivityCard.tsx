function ActivityCard() {
  return (
    <div className="bg-white my-1 border rounded-xl text-black">
      <div className="mb-2">
        <div
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1682686580003-22d3d65399a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2831&q=80)`,
          }}
          className="w-full h-[150px] rounded-xl bg-center bg-cover"
        >
          {" "}
        </div>
      </div>
      <div className="my-2 text-center">
        <p className="font-bold text-xs">Webinar di kampus Kasi Edu Jakarta Selatan</p>
        <p className="text-xs mt-2 text-center italic">26 Juni 2023</p>
      </div>
    </div>
  );
}

export default ActivityCard;
