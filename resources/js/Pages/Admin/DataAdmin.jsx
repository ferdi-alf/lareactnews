import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";

export default function DataAdmin(props) {
    console.log("dataAdmin: ", props)
    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="Data Admin" />
            <div>Hello Word</div>
        </AuthenticatedAdminLayout>
    )
}