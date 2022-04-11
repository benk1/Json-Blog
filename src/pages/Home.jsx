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

	const handleDelete = () => {};

	const exerpt = (str) => {
		if (str.length > 50) {
			str = str.substring(0, 50) + ' ... ';
		}
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
