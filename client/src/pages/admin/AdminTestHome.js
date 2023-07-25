import Navbar from "../webcomponent/NavbarAll";
import {Button } from "../webcomponent"

const AdminTestHome = () => {

    return (
        <>
            <Navbar />
            <div>
                <h1>Admin Test Home</h1>
                <Button>
                    <a href="/admin/add-co-admin">Add New Co Admin</a>
                </Button>
            </div>
        </>

    )

}

export default AdminTestHome;