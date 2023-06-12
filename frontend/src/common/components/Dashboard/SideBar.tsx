import { Ref, forwardRef } from "react";
import Link from "next/link";
import {
	HomeIcon,
	ChevronDoubleRightIcon,
	ChartBarSquareIcon,
	UsersIcon,
	CircleStackIcon,
	DocumentIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";

interface props {
	showNav?: boolean;
}

const SideBar = forwardRef(({ showNav }: props, ref: Ref<any>) => {
	const router = useRouter();
	const user: any = secureLocalStorage.getItem("user");

	return (
		<div ref={ref} className="fixed z-50 w-56 h-full bg-white shadow-lg">
			<div className="flex justify-center mt-6 mb-14">
				<picture>
					<img
						className="w-32 h-auto"
						src="/images/igad_logo.jpeg"
						alt="company logo"
					/>
				</picture>
			</div>

			<div className="flex flex-col">
				<Link href="/dashboard/">
					<div
						className={`pl-2 pr-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
							router.pathname == "/dashboard"
								? "bg-green-100 text-green-500"
								: "text-gray-400 hover:bg-green-100 hover:text-green-500"
						}`}
					>
						<div className="mr-2">
							<HomeIcon className="h-5 w-5" />
						</div>
						<div>
							<p>Home</p>
						</div>
					</div>
				</Link>
				<Link href="/dashboard/superset-dashboards/">
					<div
						className={`pl-2 pr-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
							router.pathname == "/superset-dashboards"
								? "bg-green-100 text-green-500"
								: "text-gray-400 hover:bg-green-100 hover:text-green-500"
						}`}
					>
						<div className="mr-2">
							<ChartBarSquareIcon className="h-5 w-5" />
						</div>
						<div>
							<p>Dashboards</p>
						</div>
					</div>
				</Link>
				<Link href="/dashboard/charts">
					<div
						className={`pl-2 pr-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
							router.pathname == "/dashboard/charts"
								? "bg-green-100 text-green-500"
								: "text-gray-400 hover:bg-green-100 hover:text-green-500"
						}`}
					>
						<div className="mr-2">
							<ChevronDoubleRightIcon className="h-5 w-5" />
						</div>
						<div>
							<p>Chart(s)</p>
						</div>
					</div>
				</Link>
				<Link href="/process-chains">
					<div
						className={`pl-2 pr-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
							router.pathname == "/process-chains"
								? "bg-green-100 text-green-500"
								: "text-gray-400 hover:bg-green-100 hover:text-green-500"
						}`}
					>
						<div className="mr-2">
							<ChevronDoubleRightIcon className="h-5 w-5" />
						</div>
						<div>
							<p>Process Chain(s)</p>
						</div>
					</div>
				</Link>
				<Link href="/dashboard/data">
					<div
						className={`pl-2 pr-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
							router.pathname == "/dashboard/data"
								? "bg-green-100 text-green-500"
								: "text-gray-400 hover:bg-green-100 hover:text-green-500"
						}`}
					>
						<div className="mr-2">
							<CircleStackIcon className="h-5 w-5" />
						</div>
						<div>
							<p>Data</p>
						</div>
					</div>
				</Link>
				{user?.realm_access?.roles?.includes("Administrator") && (
					<Link href="/users">
						<div
							className={`pl-2 pr-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
								router.pathname == "/users"
									? "bg-green-100 text-green-500"
									: "text-gray-400 hover:bg-green-100 hover:text-green-500"
							}`}
						>
							<div className="mr-2">
								<UsersIcon className="h-5 w-5" />
							</div>
							<div>
								<p>Accounts</p>
							</div>
						</div>
					</Link>
				)}
				{user?.realm_access?.roles?.includes("Administrator") && (
					<Link href="/roles">
						<div
							className={`pl-2 pr-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
								router.pathname == "/roles"
									? "bg-green-100 text-green-500"
									: "text-gray-400 hover:bg-green-100 hover:text-green-500"
							}`}
						>
							<div className="mr-2">
								<UsersIcon className="h-5 w-5" />
							</div>
							<div>
								<p>App Roles</p>
							</div>
						</div>
					</Link>
				)}
				<Link href="/hops">
					<div
						className={`pl-2 pr-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
							router.pathname == "/hopes"
								? "bg-green-100 text-green-500"
								: "text-gray-400 hover:bg-green-100 hover:text-green-500"
						}`}
					>
						<div className="mr-2">
							<DocumentIcon className="h-5 w-5" />
						</div>
						<div>
							<p>Hops</p>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
});

SideBar.displayName = "SideBar";

export default SideBar;