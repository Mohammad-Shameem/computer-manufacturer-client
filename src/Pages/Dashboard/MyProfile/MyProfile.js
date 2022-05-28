import React from "react";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import AddInProfile from "./AddInProfile";

const MyProfile = () => {
  return (
    <div>
      <AddInProfile></AddInProfile>
      <PageTitle title={"My profile"}></PageTitle>
    </div>
  );
};

export default MyProfile;
