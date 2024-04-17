import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";

export default function Admin(props) {
    return (
        <AuthenticatedAdminLayout>
            <Head title="admin" />

            <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, perspiciatis tempore nihil reprehenderit quam sunt suscipit modi aut a rerum ullam alias distinctio ex accusamus error velit esse. Tenetur neque voluptates deserunt quis rerum! Ducimus est ex illum sunt aperiam animi voluptate, quo, explicabo atque nisi voluptatibus ratione blanditiis praesentium autem rem magni quos iusto. Deleniti in alias culpa, quam sapiente harum. Porro esse similique unde, provident quo dolores id mollitia sit veritatis quasi voluptatibus quidem, at iure corrupti sed repellendus excepturi? Velit necessitatibus praesentium voluptatum laudantium iste a, architecto sunt voluptatibus, ipsum repellat corrupti numquam minus nihil similique error.</div>
        </AuthenticatedAdminLayout>
    )
}