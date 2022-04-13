import axios from 'axios';
import { MDBBtn, MDBInput, MDBTextArea, MDBValidation } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// itff7t1g;

const initialState = {
	title: '',
	description: '',
	category: '',
	imageUrl: '',
};
const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];

const AddEditBlog = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const getDate = () => {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	};

	const [formValue, setFormValue] = useState(initialState);
	const [categoryErrMsg, setCategoryErrMsg] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const { title, description, category, imageUrl } = formValue;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!category) {
			setCategoryErrMsg('Please select a category');
		}

		const imageValidation = !editMode ? imageUrl : true;
		if (title && description && imageUrl && category) {
			const currentDate = getDate();
			if (!editMode) {
				const updatedBlogData = { ...formValue, date: currentDate };
				const res = await axios.post(
					'http://localhost:8000/blogs',
					updatedBlogData
				);
				if (res.status === 201) {
					toast.success('Blog Created Successfully');
				} else {
					toast.error('Something went wrong');
				}
			} else {
				const res = await axios.put(
					`http://localhost:8000/blogs/${id}`,
					formValue
				);
				if (res.status === 200) {
					toast.success('Blog Updated Successfully');
				} else {
					toast.error('Something went wrong');
				}
			}

			setFormValue({ title: '', description: '', category: '', imageUrl: '' });
			navigate('/');
		}
	};

	const handleChange = (e) => {
		let { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
		console.log(e);
	};

	const onUploadImage = (file) => {
		console.log('file', file);
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', 'itff7t1g');
		axios
			.post('http://api.cloudinary.com/v1_1/dtxnozoao/image/upload', formData)
			.then((res) => {
				toast.info('Image Uploaded Successfully');
				setFormValue({ ...formValue, imageUrl: res.data.url });
			})
			.catch((error) => {
				toast.error('Something went wrong');
			});
	};
	const onCategoryChange = (e) => {
		setCategoryErrMsg(null);
		setFormValue({ ...formValue, category: e.target.value });
	};

	const getSingleBlog = async (id) => {
		const singleBlog = await axios.get(`http://localhost:8000/blogs/${id}`);
		if (singleBlog.status === 200) {
			setFormValue({ ...singleBlog.data });
		} else {
			toast.error('Something Went Wrong');
		}
	};

	useEffect(() => {
		if (id) {
			setEditMode(true);
			getSingleBlog(id);
		} else {
			setEditMode(false);
			setFormValue({ ...initialState });
		}
	}, [id]);
	return (
		<MDBValidation
			className="row g-3"
			style={{ marginTop: '100px' }}
			noValidate
			onSubmit={handleSubmit}
		>
			<p className="fs-2 fw-bold">{editMode ? 'Update Blog' : 'Add Blog'}</p>
			<div
				style={{
					margin: 'auto',
					padding: '15px',
					maxWidth: '400px',
					alignContent: 'center',
				}}
			>
				<MDBInput
					value={title || ''}
					name="title"
					type="text"
					onChange={handleChange}
					required
					label="Title"
					validation="Please provide a title"
					invalid
				/>
				<br />

				<MDBTextArea
					value={description || ''}
					name="description"
					type="text"
					onChange={handleChange}
					required
					label="Description"
					validation="Please provide a Description"
					textarea
					rows={4}
					invalid
				/>
				<br />

				{!editMode && (
					<>
						<MDBInput
							type="file"
							onChange={(e) => onUploadImage(e.target.files[0])}
							required
							validation="Please Choose  a file to upload"
							invalid
						/>
					</>
				)}
				<br />

				<select
					className="categoryDropdown"
					onChange={onCategoryChange}
					value={category}
				>
					<option>Please select category</option>
					{options.map((option, index) => (
						<option value={option || ''} key={index}>
							{option}
						</option>
					))}
				</select>
				{categoryErrMsg && (
					<div className="categoryErrorMsg">{categoryErrMsg}</div>
				)}
				<br />
				<br />

				<MDBBtn type="submit" style={{ marginRight: '10px' }}>
					{editMode ? 'Update' : 'Add'}
				</MDBBtn>
				<MDBBtn
					color="danger"
					style={{ marginRight: '10px' }}
					onClick={() => navigate('/')}
				>
					Go Back
				</MDBBtn>
			</div>
		</MDBValidation>
	);
};

export default AddEditBlog;
