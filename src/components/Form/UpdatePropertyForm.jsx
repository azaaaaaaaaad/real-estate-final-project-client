
const UpdatePropertyForm = ({ allProperties, handleSubmit, setImagePreview, imagePreview, handleImage, imageText }) => {
    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='location' className='block text-gray-600'>
                                Property Location
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-700 rounded-md '
                                name='location'
                                id='location'
                                type='text'
                                defaultValue={allProperties.location}
                            />
                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-gray-600'>
                                Property Title
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-700 rounded-md '
                                name='title'
                                id='title'
                                type='text'
                                defaultValue={allProperties.title}
                            />
                        </div>

                        <div className=' p-4 bg-white w-full  m-auto rounded-lg flex justify-between items-center'>
                            <div className='file_upload px-5 py-3 relative border-4 border-double border-blue-500 rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                        <input
                                            className='text-sm cursor-pointer w-36 hidden'
                                            type='file'
                                            onChange={e => handleImage(e.target.files[0])}
                                            name='image'
                                            id='image'
                                            accept='image/*'
                                            hidden
                                        />
                                        <div className='bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-700'>
                                            {imageText.length > 20
                                                ? imageText.split('.')[0].slice(0, 15) +
                                                '....' +
                                                imageText.split('.')[1] : imageText}
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="h-16 w-16 object-cover overflow-hidden flex items-center">
                                {imagePreview && <img src={imagePreview}></img>}
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='price' className='block text-gray-600'>
                                    Price Min
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-700 rounded-md '
                                    name='priceMin'
                                    id='price'
                                    type='number'
                                    defaultValue={allProperties.priceMin}
                                />
                            </div>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='price' className='block text-gray-600'>
                                    Price Max
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-700 rounded-md '
                                    name='priceMax'
                                    id='price'
                                    type='number'
                                    defaultValue={allProperties.priceMax}
                                />
                            </div>
                        </div>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='description' className='block text-gray-600'>
                                Description
                            </label>

                            <textarea
                                id='description'
                                className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-blue-300 focus:outline-blue-700 '
                                name='description'
                                defaultValue={allProperties.description}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-700'
                >
                    Update Property
                </button>
            </form>
        </div>
    );
};

export default UpdatePropertyForm;