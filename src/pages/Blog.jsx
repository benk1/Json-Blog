import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBRow,
	MDBTypography,
} from 'mdb-react-ui-kit';
import Badge from '../components/Badge';

const Blog = () => {
	const styleInfo = {
		display: 'inline',
		marginLeft: '5px',
		float: 'right',
		marginTop: '7px',
	};
	const [blog, setBlog] = useState();
	const [relatedPost, setRelatedPost] = useState([]);
	const { id } = useParams();

	const getSingleBlog = async () => {
		const res = await axios.get(`http://localhost:8000/blogs/${id}`);
		const relatedPostData = await axios.get(
			`http://localhost:8000/blogs?category=${res.data.category}&_start=0&_end=3`
		);

		if (res.status === 200 || relatedPost.status === 200) {
			setBlog(res.data);
			setRelatedPost(relatedPostData.data);
		} else {
			toast.error('Something went wrong!!');
		}
	};

	useEffect(() => {
		if (id) {
			getSingleBlog();
		}
	}, [id]);

	const exerpt = (str) => {
		if (str.length > 60) {
			str = str.substring(0, 60) + ' ... ';
		}
		return str;
	};
	return (
		<MDBContainer style={{ border: '1px solid #d1ebe8', marginTop: '10px' }}>
			<Link to="/">
				<strong style={{ float: 'left', color: 'black' }} className="mt-3">
					Go back
				</strong>
			</Link>
			<MDBTypography
				tag="h2"
				className="text-muted mt-2"
				style={{ display: 'inline-block' }}
			>
				{blog && blog.title}
			</MDBTypography>
			<img
				src={blog && blog.imageUrl}
				alt="blog && blot.title"
				className="img-fluid rounded"
				style={{ width: '100%', maxHeight: '600px' }}
			/>
			<div style={{ marginTop: '20px' }}>
				<div style={{ height: '43px', background: '#f6f6f6' }}>
					<MDBIcon
						style={{ float: 'left' }}
						className="mt-3"
						far
						icon="calendar-alt"
						size="lg"
					/>
					<strong
						style={{ float: 'left', marginTop: '12px', marginLeft: '2px' }}
					>
						{blog && blog.date}
					</strong>
					<Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
				</div>

				<MDBTypography className="lead md-0">
					{blog && blog.description}
				</MDBTypography>
			</div>
			{relatedPost && relatedPost.length > 0 && (
				<>
					{relatedPost.length > 1 && <h1>Related Post</h1>}
					<MDBRow className="row-cols-1 row-cols-md-3 g-4">
						{relatedPost
							.filter((item) => item.id != id)
							.map((item, index) => (
								<MDBCol>
									<MDBCard>
										<Link to={`/blog/${item.id}`}>
											<MDBCardImage
												src={item.imageUrl}
												alt={item.title}
												position="top"
											/>
										</Link>
										<MDBCardBody>
											<MDBCardTitle>{item.title}</MDBCardTitle>
											<MDBCardTitle>{exerpt(item.description)}</MDBCardTitle>
										</MDBCardBody>
									</MDBCard>
								</MDBCol>
							))}
					</MDBRow>
				</>
			)}
		</MDBContainer>
	);
};

export default Blog;
