import {Header} from "../webcomponent";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import {Avatar} from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";

function ViewComplains() {
    return (
        <div>
            <Header active="Complains">
                <div className="flex flex-col">
                    <Card className="mt-6 w-50">
                            <CardBody className="flex items-start">
                                <Avatar
                                    variant="circular"
                                    alt="tania andrew"
                                    className="cursor-pointer border-2 border-main-purple hover:z-10 focus:z-10 ml-1"
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                                <div className="ml-4">
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        Nimal Fernando - 02/10/2021
                                    </Typography>
                                </div>
                            </CardBody>
                            <CardBody className="mt-[-2rem]">
                                <Typography>
                                    The place is close to Barceloneta Beach and bus stop just 2 min by
                                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                    night life in Barcelona.
                                </Typography>
                                <div className="w-full mt-2">
                                    <Textarea label="Action taken" color="purple"/>
                                </div>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <div className="flex justify-center">
                                    <Button variant="outlined" color="green">Action taken</Button>
                                    <Button variant="outlined" color="red" className="ml-2">Ignore</Button>
                                </div>

                            </CardFooter>
                    </Card>
                    <Card className="mt-6 w-50">
                            <CardBody className="flex items-start">
                                <Avatar
                                    variant="circular"
                                    alt="tania andrew"
                                    className="cursor-pointer border-2 border-main-purple hover:z-10 focus:z-10 ml-1"
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                                <div className="ml-4">
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        Nimal Fernando - 02/10/2021
                                    </Typography>
                                </div>
                            </CardBody>
                            <CardBody className="mt-[-2rem]">
                                <Typography>
                                    The place is close to Barceloneta Beach and bus stop just 2 min by
                                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                    night life in Barcelona.
                                </Typography>
                                <div className="w-full mt-2">
                                    <Textarea label="Action taken" color="purple"/>
                                </div>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <div className="flex justify-center">
                                    <Button variant="outlined" color="green">Action taken</Button>
                                    <Button variant="outlined" color="red" className="ml-2">Ignore</Button>
                                </div>

                            </CardFooter>
                    </Card>
                    <Card className="mt-6 w-50">
                            <CardBody className="flex items-start">
                                <Avatar
                                    variant="circular"
                                    alt="tania andrew"
                                    className="cursor-pointer border-2 border-main-purple hover:z-10 focus:z-10 ml-1"
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                                <div className="ml-4">
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        Nimal Fernando - 02/10/2021
                                    </Typography>
                                </div>
                            </CardBody>
                            <CardBody className="mt-[-2rem]">
                                <Typography>
                                    The place is close to Barceloneta Beach and bus stop just 2 min by
                                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                    night life in Barcelona.
                                </Typography>
                                <div className="w-full mt-2">
                                    <Textarea label="Action taken" color="purple"/>
                                </div>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <div className="flex justify-center">
                                    <Button variant="outlined" color="green">Action taken</Button>
                                    <Button variant="outlined" color="red" className="ml-2">Ignore</Button>
                                </div>

                            </CardFooter>
                    </Card>
                    <Card className="mt-6 w-50">
                            <CardBody className="flex items-start">
                                <Avatar
                                    variant="circular"
                                    alt="tania andrew"
                                    className="cursor-pointer border-2 border-main-purple hover:z-10 focus:z-10 ml-1"
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                                <div className="ml-4">
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        Nimal Fernando - 02/10/2021
                                    </Typography>
                                </div>
                            </CardBody>
                            <CardBody className="mt-[-2rem]">
                                <Typography>
                                    The place is close to Barceloneta Beach and bus stop just 2 min by
                                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                    night life in Barcelona.
                                </Typography>
                                <div className="w-full mt-2">
                                    <Textarea label="Action taken" color="purple"/>
                                </div>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <div className="flex justify-center">
                                    <Button variant="outlined" color="green">Action taken</Button>
                                    <Button variant="outlined" color="red" className="ml-2">Ignore</Button>
                                </div>

                            </CardFooter>
                    </Card>
                    
                </div>

            </Header>
        </div>
    )
}

export default ViewComplains;