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
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Complain date - 02/10/2021
                                </Typography>
                            </div>
                        </CardBody>
                        <CardBody className="mt-[-3rem]">
                            <Typography>
                                The place is close to Barceloneta Beach and bus stop just 2 min by
                                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                night life in Barcelona.
                            </Typography>
                            <div className="w-full mt-2">
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Action taken - 02/12/2021
                                </Typography>
                                <Typography>
                                The place is close to Barceloneta Beach and bus stop just 2 min by
                                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                night life in Barcelona.
                            </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <div className="flex justify-center">
                                <Button variant="outlined" color="green">Done</Button>
                            </div>

                        </CardFooter>
                    </Card>
                    <Card className="mt-6 w-50">
                        <CardBody className="flex items-start">
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Complain date - 02/10/2021
                                </Typography>
                            </div>
                        </CardBody>
                        <CardBody className="mt-[-3rem]">
                            <Typography>
                                The place is close to Barceloneta Beach and bus stop just 2 min by
                                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                night life in Barcelona.
                            </Typography>
                            <div className="w-full mt-2">
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Action taken - 02/12/2021
                                </Typography>
                                <Typography>
                                The place is close to Barceloneta Beach and bus stop just 2 min by
                                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                night life in Barcelona.
                            </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <div className="flex justify-center">
                                <Button variant="outlined" color="green">Done</Button>
                            </div>

                        </CardFooter>
                    </Card>
                    <Card className="mt-6 w-50">
                        <CardBody className="flex items-start">
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Complain date - 02/10/2021
                                </Typography>
                            </div>
                        </CardBody>
                        <CardBody className="mt-[-3rem]">
                            <Typography>
                                The place is close to Barceloneta Beach and bus stop just 2 min by
                                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                night life in Barcelona.
                            </Typography>
                            <div className="w-full mt-2">
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Action taken - 02/12/2021
                                </Typography>
                                <Typography>
                                The place is close to Barceloneta Beach and bus stop just 2 min by
                                walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                night life in Barcelona.
                            </Typography>
                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <div className="flex justify-center">
                                <Button variant="outlined" color="green">Done</Button>
                            </div>

                        </CardFooter>
                    </Card>
                </div>

            </Header>
        </div>
    )
}

export default ViewComplains;