import TableAdmin from "@/Components/Admin/TableAdmin";
import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";

export default function DataAdmin(props) {
    console.log("dataAdmin: ", props)
    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="Data Admin" />

            <div className="py-12 flex flex-wrap justify-center items-center flex-col" style={{ height: "100vh" }}>
                <p>Helllo Word</p>
            </div>
        </AuthenticatedAdminLayout>
    )
}