import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardText,
	MDBCardTitle,
	MDBCol,
	MDBIcon,
} from 'mdb-react-ui-kit';
import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';

const Blogs = ({
	title,
	category,
	description,
	id,
	imageUrl,
	exerpt,
	onDelete,
}) => {
	return (
		<MDBCol size="4">
			<MDBCard className="h-100 mt-2" style={{ maxWidth: '22rem' }}>
				<MDBCardImage
					src={imageUrl}
					alt="title"
					position="top"
					style={{ maxWidth: '100%', height: '180px' }}
				></MDBCardImage>
				<MDBCardBody>
					<MDBCardTitle>{title}</MDBCardTitle>
					<MDBCardText>
						{exerpt(description)} <Link to={`/blog/${id}`}>Read More</Link>
					</MDBCardText>
					<Badge>{category}</Badge>
					<span>
						<MDBBtn
							className="mt-1"
							tag="a"
							color="none"
							onClick={() => onDelete(id)}
						>
							<MDBIcon fas icon="trash" style={{ color: 'red' }} size="lg" />
						</MDBBtn>
						<Link to={`/editBlog/${id}`}>
							<MDBIcon
								fas
								icon="edit"
								style={{ color: '55aee', marginLeft: '10px' }}
								size="lg"
							/>
						</Link>
					</span>
				</MDBCardBody>
			</MDBCard>
		</MDBCol>
	);
};

export default Blogs;
