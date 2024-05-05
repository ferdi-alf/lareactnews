import '../../../../public/css/style.css'
import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";

export default function ViewsPending(props) {
    console.log("data", props)
    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="view" />


            <div className="bg-white flex justify-center items-center flex-col" style={{ width: "100%" }}>
                <div className="img">
                    <img src={`/storage/images/${props.data.foto}`} alt="" />
                </div>
                <div className="description view">
                    <p className="title" style={{ fontSize: "20px", color: "black", fontWeight: "bold" }}>
                        {props.data.title_news}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, ullam? <br />
                    </p>
                    <div className="text-black">
                        <p style={{ marginTop: "10px" }}>id: {props.data.id}</p>
                        <p>oleh: {props.data.user_name}</p>
                        <p>email: {props.data.user_email}</p>
                    </div>

                    <p style={{ marginTop: "45px", fontWeight: "200", fontSize: "15px", color: "black" }}>
                        {props.data.description_news}
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo veritatis dolor eligendi, quaerat maiores mollitia dolorum sunt enim delectus expedita nobis repellendus eaque esse ut neque sint ipsam. Aspernatur quae distinctio reprehenderit quasi? Blanditiis et laboriosam iusto totam, expedita voluptates impedit tenetur earum, odit modi fugit illum velit! Quidem, quas fugit. Ipsam expedita ullam necessitatibus nemo officia iste error assumenda. Repudiandae, delectus nemo aspernatur quidem architecto, natus tempora nostrum libero quo facilis maxime autem ipsa, perferendis iure labore. Dicta doloribus odio laudantium assumenda, nulla architecto id voluptatum accusantium animi aliquid distinctio dolorum eveniet exercitationem provident atque iste ex laboriosam, officia qui! Ut eveniet, quos quod aperiam delectus distinctio dignissimos tempore.
                    </p>
                </div>
            </div>
        </AuthenticatedAdminLayout>
    )
}