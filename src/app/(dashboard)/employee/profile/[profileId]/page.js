// pages/posts/[slug].js
import axios from "axios";
import nookies from "nookies";
// import { useRouter } from "next/router";

const page = ({ params }) => {
  // const router = useRouter();

  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      TESS
      <h1>{params.name}</h1>
      <p>{params.username}</p>
    </div>
  );
};

// export async function getServerSideProps({ params }) {
//   const { profileId } = params;
//   const cookies = nookies.get(params);
//   const token = cookies.token;
//   if (!token) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   }

//   const response = await axios.get(
//     `${process.env.NEXT_PUBLIC_URL}/api/user/${profileId}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//     }
//   );

//   const data = await response.json();

//   if (data.error) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   }

//   return {
//     props: { data },
//   };
// }

export default page;
