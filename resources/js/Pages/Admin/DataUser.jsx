import TableUser from "@/Components/Admin/TableUser";
import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";

export default function DataUser(props) {
    console.log('data user: ', props)
    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="Data User" />

            <div className="py-12 flex flex-wrap justify-center items-center flex-col" style={{ height: "100vh" }}>
                <TableUser data={props.dataUser.data} />
            </div>
        </AuthenticatedAdminLayout>
    )
}