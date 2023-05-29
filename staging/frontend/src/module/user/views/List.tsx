import { IGADTable } from "@/components/common/table";
import {
	DeleteColumnOutlined,
	PlusOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Popconfirm, Switch, message } from "antd";
import { useUsers } from "../hooks";
import { IUser } from "../interface";
import { useEffect, useState } from "react";
import { AddUser } from "./Add";
import axios from "axios";
import { getData } from "@/utils";
import { PreviewUser } from "./Preview";
import form from "antd/es/form";
import { OpenNotification } from "@/utils/notify";

interface props {
	viewPro: () => void;
}

export const UserList = () => {
	const [form] = Form.useForm();
	const del = () => {};

	const [token, setToken] = useState<string>("");

	const fetchToken = async () => {
		try {
			const url = "/api/get-access-token/";
			const response = await getData(url);
			setToken(response?.accessToken);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const [open, setOpen] = useState<boolean>(false);
	const [data, setData] = useState<Array<IUser>>([]);

	const [view, setView] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>();
	const viewPro = (id: string) => {
		setView(true);
		setUserId(id);
	};
	const onCloseView = () => {
		setView(false);
	};

	const onClose = () => {
		setOpen(false);
	};

	const fetchUsers = async () => {
		try {
			const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/users`;
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setData(response?.data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const refetch = () => {
		fetchUsers();
	};

	const [openModal, setOpenModal] = useState<boolean>(false);

	const edit = (id: string, firstName: string, lastName: string, username: string, email: string, enabled: boolean) => {
		setUserId(id);
		setOpenModal(true);
		form.setFieldValue("firstName", firstName);
		form.setFieldValue("lastName", lastName);
		form.setFieldValue("username", username);
		form.setFieldValue("email", email);
		form.setFieldValue("enabled", enabled)
	};

	const handleCancel = () => {
		setOpenModal(false);
	};

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 8 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 },
		},
	};

	const onFinish = async (values: any) => {
		await axios
			.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/account/user/${userId}/update`,
				values,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				OpenNotification(res?.data?.message, "topRight", "success");
				setOpenModal(false);
				refetch();
				form.resetFields()
			})
			.catch((err) => {
				OpenNotification(err.response?.data?.error, "topRight", "error");
			});
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const { columns, loading } = useUsers({ edit, viewPro, refetch });
	return (
		<div className="">
			<nav>
				<div className="flex justify-between">
					<div>
						<h2 className="text-3xl">App Accounts</h2>
						<p className="my-2 text-gray-600">
							View and manage settings related to app users.
						</p>
					</div>
					<div>
						<Button
							type="primary"
							className="flex items-center"
							size="large"
							icon={<PlusOutlined />}
							style={{
								backgroundColor: "#087757",
								border: "1px solid #e65e01",
							}}
							onClick={(e) => {
								e.preventDefault();
								setOpen(true);
							}}
						>
							New User
						</Button>
					</div>
				</div>
			</nav>
			<section className="mt-5">
				<div className="py-2">
					<IGADTable
						key={"id"}
						loading={loading}
						rows={data}
						columns={columns}
					/>
				</div>
			</section>
			<div>
				<AddUser openDrawer={open} closeDrawer={onClose} refetch={fetchUsers} />
			</div>
			<div>
				{view && userId && (
					<PreviewUser
						openDrawer={view}
						closeDrawer={onCloseView}
						userId={userId}
					/>
				)}
			</div>
			<Modal
				open={openModal}
				title={"Update Account"}
				onCancel={handleCancel}
				footer={
					<Form form={form} name="update" onFinish={onFinish}>
						<Form.Item>
							<div className="flex space-x-2 justify-end">
								<Button
									className="focus:outline-none px-6 py-2 text-gray-700 font-medium flex items-center"
									style={{
										backgroundColor: "#48328526",
										border: "1px solid #48328526",
									}}
									type="primary"
									size="large"
									icon={<DeleteColumnOutlined />}
									onClick={handleCancel}
								>
									Cancel
								</Button>
								<Button
									type="primary"
									className="flex items-center"
									icon={<SaveOutlined />}
									style={{
										backgroundColor: "#087757",
										border: "1px solid #e65e01",
									}}
									htmlType="submit"
									size="large"
								>
									Save Changes
								</Button>
							</div>
						</Form.Item>
					</Form>
				}
			>
				<div className="mt-8">
					<Form
						{...formItemLayout}
						form={form}
						name="update"
						onFinish={onFinish}
						scrollToFirstError
						size="large"
						className="w-full"
					>
						<Form.Item
							name="firstName"
							label="Given Names"
							className="w-full"
							rules={[
								{
									required: true,
									message: "Please input your given names",
								},
							]}
						>
							<Input className="w-full" />
						</Form.Item>
						<Form.Item
							name="lastName"
							label="Family Name"
							rules={[
								{
									required: true,
									message: "Please input your family name",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name="email"
							label="E-mail"
							rules={[
								{
									type: "email",
									message: "The input is not valid E-mail!",
								},
								{
									required: true,
									message: "Please input your E-mail!",
								},
							]}
						>
							<Input className="w-full" />
						</Form.Item>
						<Form.Item
							name="username"
							label="Username"
							rules={[
								{
									required: true,
									message: "Please input your username",
								},
							]}
						>
							<Input disabled />
						</Form.Item>

						<Form.Item
							name="enabled"
							label="Enable"
							valuePropName="checked"
							tooltip="Do you want to automatically enable this user?"
						>
							<Switch style={{ backgroundColor: "#8c8c8c" }} />
						</Form.Item>
					</Form>
					<Divider dashed={true} style={{border: "1px solid gray"}} />
				</div>
			</Modal>
		</div>
	);
};
