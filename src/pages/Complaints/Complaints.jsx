// import { useState } from "react";
// import Success from "@components/feedback/Success/Success";
// import FormComplaints from "@components/forms/Complaints/FormComplaints";
import PathName from "@components/Housing-system/PathName/PathName";
// import { useDispatch, useSelector } from "react-redux";
// import { createComplaint } from "@store/reducers/Complaints/ComplaintsSlice";

const Complaints = () => {
  // const [success, setSuccess] = useState("");
  // const dispatch = useDispatch();

  // const { isLoading } = useSelector((state) => state.complaints);

  // const onSubmit = (data) => {
  //   console.log(data);
  //   dispatch(createComplaint(data))
  //     .unwrap()
  //     .then(() => {
  //       setSuccess("تم اضافة الشكوي بنجاح");
  //     });
  // };

  // useEffect(() => {
  //   if (success) {
  //     setTimeout(() => {
  //       setSuccess("");
  //     }, 5000);
  //   }
  // }, [success]);

  return (
    <section>
      <div className="section_content">
        <PathName path="اضافة" name="الشكاوي / " />

        {/* <Success message={success} /> */}
        {/* 
        <FormComplaints
          onSubmit={onSubmit}
          reset={true}
          isLoading={isLoading}
        /> */}
      </div>
    </section>
  );
};

export default Complaints;
