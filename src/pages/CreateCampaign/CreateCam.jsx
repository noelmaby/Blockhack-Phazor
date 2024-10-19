import React,{ useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './createcamp.css';
const CreateCam = () => {

  const [campaignName, setCampaignName] = useState('');
    const [description, setDescription] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!campaignName || !description || !targetAmount || !image) {
            console.log('Please fill all fields and upload an image!');
            return;
        }

        // Prepare data for submission (API integration can go here)
        const formData = new FormData();
        formData.append('name', campaignName);
        formData.append('description', description);
        formData.append('targetAmount', targetAmount);
        formData.append('image', image);

        // Simulating an API call
        console.log('Campaign created successfully!');
        console.log('Campaign Data: ', formData); // Replace with actual API call

        // Reset form
        setCampaignName('');
        setDescription('');
        setTargetAmount('');
        setImage(null);
    };

  return (
    <div className="create-campaign mt-5">
    <h1>Create a New Campaign</h1>
    <form onSubmit={handleSubmit}>
        <div className="form-group mt-5">
            <label htmlFor="campaignName">Campaign Name:</label>
            <input
                type="text"
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="targetAmount">Target Amount (in ETH):</label>
            <input
                type="number"
                id="targetAmount"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required
            />
        </div>
        <button type="submit" className="submit-button">Create Campaign</button>
    </form>
</div>
  
  )
}

export default CreateCam