import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataDashboard from "@/Components/Dashboard/DataDashboard";
import '../../../public/css/style.css'



export default function Dashboard(props) {
    console.log('props: ', props)

    return (
        < AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12 flex flex-wrap justify-center items-center flex-col h-full">
                <DataDashboard total={props.total} pesan={props.pesanAdmin} />
            </div>

        </ AuthenticatedLayout >
    )
}