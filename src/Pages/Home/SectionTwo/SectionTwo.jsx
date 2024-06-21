import React from 'react';

const SectionTwo = () => {
    return (
        <div>
            <h2 className='text-2xl text-center font-semibold mb-6'>FAQ</h2>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    What is Real Estate?
                </div>
                <div className="collapse-content">
                    <p>Real estate refers to property consisting of land and the buildings, structures, or natural resources on it. It encompasses a broad range of physical assets, including residential houses, commercial buildings, vacant land, and agricultural property. Real estate is a significant component of both individual wealth and the global economy.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    What are the benefits of online Real Estate?
                </div>
                <div className="collapse-content">
                    <ul>
                        <li> "Online real estate" refers to the practice of buying, selling, renting, or leasing properties using digital platforms and technologies. It encompasses various aspects of the real estate industry that are conducted online, from property listings and searches to transactions and property management.</li>
                        <li>24/7 Access: Users can browse property listings and conduct transactions at any time, from anywhere with internet access.</li>
                        <li>Global Reach: Online platforms allow properties to be marketed to a global audience, expanding the pool of potential buyers or tenants.</li>
                        <li>Instant Information: Detailed property information, photos, virtual tours, and neighborhood data are readily available, aiding in quick decision-making.</li>
                    </ul>
                </div>
            </div>
            {/* <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How can I find an property on Real Estate website?
                </div>
                <div className="collapse-content">
                    <ul>
                        <li>Establish clear communication channels and schedules.</li>
                        <li>Set specific goals and objectives for each study session.</li>
                        <li>Divide tasks and responsibilities among group members.</li>
                        <li>Encourage active participation and engagement from all members.</li>
                        <li>Utilize online tools for collaboration, note-taking, and document sharing.</li>
                        <li>Provide constructive feedback and support to group members</li>
                    </ul>

                </div>
            </div> */}
        </div>
    );
};

export default SectionTwo;