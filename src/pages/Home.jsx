import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Blogs from '../components/Blogs';

const Home = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		loadBlogData();
	}, []);

	const loadBlogData = async () => {
		const res = await axios.get('http://localhost:8000/blogs');
		if (res.status === 200) {
			setData(res.data);
		} else {
			toast.error('Something went wrong!!');
		}
	};

	console.log('DATA', data);

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this blog? ')) {
			const res = await axios.delete(`http://localhost:8000/blogs/${id}`);
			if (res.status === 200) {
				toast.success('Blog deleted successfully');
				loadBlogData();
			} else {
				toast.error('Something went wrong!!');
			}
		}
	};

	const exerpt = (str) => {
		if (str.length > 50) {
			str = str.substring(0, 50) + ' ... ';
		}
		return str;
	};
	return (
		<>
			<MDBRow>
				{data.length === 0 && (
					<MDBTypography className="text-center mb-0" tag="h2">
						No Blog Found
					</MDBTypography>
				)}
				<MDBCol>
					<MDBContainer>
						<MDBRow>
							{data &&
								data.map((item, index) => (
									<Blogs
										key={index}
										{...item}
										exerpt={exerpt}
										onDelete={handleDelete}
									/>
								))}
						</MDBRow>
					</MDBContainer>
				</MDBCol>
			</MDBRow>
		</>
	);
};

export default Home;
