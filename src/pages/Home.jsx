import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Blogs from '../components/Blogs';
import Category from '../components/Category';
import LatestBlog from '../components/LatestBlog';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

const Home = () => {
	const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];
	const [data, setData] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [latestBlog, setLatestBlog] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [pageLimit] = useState(5);
	const [totalBlog, setTotalBlog] = useState(null);

	useEffect(() => {
		loadBlogData(0, 5, 0);
		fetchLatestBlog();
	}, []);

	const fetchLatestBlog = async () => {
		const totalBlog = await axios.get('http://localhost:8000/blogs');
		setTotalBlog(totalBlog.data.length);
		const start = totalBlog.data.length - 4;
		const end = totalBlog.data.length;
		const res = await axios.get(
			`http://localhost:8000/blogs?_start=${start}&_end=${end}`
		);
		if (res.status === 200) {
			setLatestBlog(res.data);
		} else {
			toast.error('Something went wrong!!');
		}
	};

	const loadBlogData = async (start, end, increase, operation) => {
		const totalBlog = await axios.get('http://localhost:8000/blogs');
		setTotalBlog(totalBlog.data.length);
		const res = await axios.get(
			`http://localhost:8000/blogs?_start=${start}&_end=${end}`
		);
		if (res.status === 200) {
			setData(res.data);
			if (operation) {
				setCurrentPage(0);
			} else {
				setCurrentPage(currentPage + increase);
			}
		} else {
			toast.error('Something went wrong!!');
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this blog? ')) {
			const res = await axios.delete(`http://localhost:8000/blogs/${id}`);
			if (res.status === 200) {
				toast.success('Blog deleted successfully');
				loadBlogData(0, 5, 0, 'delete');
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

	const handleInputChange = (e) => {
		if (!e.target.value) {
			loadBlogData(0, 5, 0);
		}
		setSearchValue(e.target.value);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		const res = await axios.get(`http://localhost:8000/blogs?q=${searchValue}`);
		if (res.status === 200) {
			setData(res.data);
		} else {
			toast.error('Something went wrong!');
		}
	};

	const handleCategory = async (category) => {
		const res = await axios.get(
			`http://localhost:8000/blogs?category=${category}`
		);
		if (res.status === 200) {
			setData(res.data);
		} else {
			toast.error('Something went wrong!');
		}
	};
	return (
		<>
			<Search
				searchValue={searchValue}
				onChange={handleInputChange}
				onSearch={handleSearch}
			/>
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

				<MDBCol size="3">
					<h4 className="text-start">Latest Post</h4>
					{latestBlog &&
						latestBlog.map((item, index) => (
							<LatestBlog key={index} {...item} />
						))}
					<Category options={options} handleCategory={handleCategory} />
				</MDBCol>
			</MDBRow>
			<div className="mt-5">
				<Pagination
					currentPage={currentPage}
					loadBlogsData={loadBlogData}
					pageLimit={pageLimit}
					data={data}
					totalBlog={totalBlog}
				/>
			</div>
		</>
	);
};

export default Home;
