const mongoose = require('mongoose');
const Tour = require('./models/Tour');
require('dotenv').config();

// Sample tour data with Unsplash images
const sampleTours = [
    {
        title: "Bali Beach Paradise",
        location: "Bali, Indonesia",
        price: 1200,
        description: "Experience the pristine beaches and vibrant culture of Bali. Includes beachfront accommodation, water sports, and traditional Balinese spa treatments.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        duration: "5 Days",
        category: "Beach",
        maxGroupSize: 12,
        rating: 4.8
    },
    {
        title: "Swiss Alps Adventure",
        location: "Swiss Alps, Switzerland",
        price: 2500,
        description: "Explore the majestic Swiss Alps with guided hiking tours, mountain climbing, and breathtaking views. Perfect for adventure enthusiasts.",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
        duration: "7 Days",
        category: "Mountain",
        maxGroupSize: 8,
        rating: 4.9
    },
    {
        title: "Tokyo Cultural Experience",
        location: "Tokyo, Japan",
        price: 1800,
        description: "Immerse yourself in Japanese culture with temple visits, traditional tea ceremonies, and authentic cuisine tours through Tokyo's vibrant neighborhoods.",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
        duration: "6 Days",
        category: "Cultural",
        maxGroupSize: 15,
        rating: 4.7
    },
    {
        title: "Safari in Serengeti",
        location: "Serengeti, Tanzania",
        price: 3200,
        description: "Witness the great migration and encounter Africa's Big Five on this unforgettable safari adventure with expert guides and luxury lodges.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
        duration: "8 Days",
        category: "Wildlife",
        maxGroupSize: 10,
        rating: 5.0
    },
    {
        title: "Paris City Lights",
        location: "Paris, France",
        price: 1500,
        description: "Discover the romance of Paris with guided tours of the Eiffel Tower, Louvre Museum, and charming cafes along the Seine River.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        duration: "4 Days",
        category: "City",
        maxGroupSize: 20,
        rating: 4.6
    },
    {
        title: "Maldives Island Escape",
        location: "Maldives",
        price: 2800,
        description: "Relax in overwater bungalows, snorkel in crystal-clear waters, and enjoy world-class dining in this tropical paradise.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
        duration: "5 Days",
        category: "Beach",
        maxGroupSize: 6,
        rating: 4.9
    },
    {
        title: "Amazon Rainforest Trek",
        location: "Amazon, Brazil",
        price: 2200,
        description: "Journey deep into the Amazon rainforest with experienced guides. Spot exotic wildlife and learn about indigenous cultures.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
        duration: "6 Days",
        category: "Adventure",
        maxGroupSize: 8,
        rating: 4.8
    },
    {
        title: "Iceland Northern Lights",
        location: "Reykjavik, Iceland",
        price: 1900,
        description: "Chase the magical Northern Lights, explore ice caves, and relax in geothermal hot springs in this winter wonderland.",
        image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
        duration: "5 Days",
        category: "Adventure",
        maxGroupSize: 12,
        rating: 4.7
    },
    {
        title: "Machu Picchu Explorer",
        location: "Cusco, Peru",
        price: 1600,
        description: "Trek the ancient Inca Trail to the mystical ruins of Machu Picchu. Includes guided tours and traditional Peruvian cuisine.",
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
        duration: "7 Days",
        category: "Cultural",
        maxGroupSize: 10,
        rating: 4.9
    },
    {
        title: "Dubai Luxury Experience",
        location: "Dubai, UAE",
        price: 2100,
        description: "Experience luxury shopping, desert safaris, and stunning architecture in this modern Middle Eastern metropolis.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        duration: "4 Days",
        category: "City",
        maxGroupSize: 15,
        rating: 4.5
    },
    {
        title: "Great Barrier Reef Diving",
        location: "Queensland, Australia",
        price: 2400,
        description: "Dive into the world's largest coral reef system. Perfect for both beginners and experienced divers with certified instructors.",
        image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80",
        duration: "6 Days",
        category: "Beach",
        maxGroupSize: 8,
        rating: 4.8
    },
    {
        title: "Santorini Sunset Tour",
        location: "Santorini, Greece",
        price: 1400,
        description: "Witness breathtaking sunsets, explore white-washed villages, and taste authentic Greek cuisine on this romantic getaway.",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
        duration: "5 Days",
        category: "Beach",
        maxGroupSize: 12,
        rating: 4.7
    },
    {
        title: "Norwegian Fjords Cruise",
        location: "Bergen, Norway",
        price: 2600,
        description: "Sail through dramatic fjords, visit charming coastal villages, and experience the beauty of Scandinavia.",
        image: "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?w=800&q=80",
        duration: "7 Days",
        category: "Adventure",
        maxGroupSize: 20,
        rating: 4.6
    },
    {
        title: "New Zealand Adventure",
        location: "Queenstown, New Zealand",
        price: 2300,
        description: "Bungee jumping, skydiving, and exploring Middle Earth filming locations in the adventure capital of the world.",
        image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
        duration: "8 Days",
        category: "Adventure",
        maxGroupSize: 10,
        rating: 4.9
    },
    {
        title: "Morocco Desert Safari",
        location: "Marrakech, Morocco",
        price: 1300,
        description: "Ride camels through the Sahara, sleep under the stars, and explore ancient medinas in this exotic North African adventure.",
        image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80",
        duration: "6 Days",
        category: "Cultural",
        maxGroupSize: 12,
        rating: 4.8
    }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing tours
        await Tour.deleteMany({});
        console.log('🗑️  Cleared existing tours');

        // Insert sample tours
        await Tour.insertMany(sampleTours);
        console.log(`✅ Successfully added ${sampleTours.length} sample tours!`);

        // Display summary
        console.log('\n📊 Tour Summary:');
        const categories = await Tour.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);
        categories.forEach(cat => {
            console.log(`   ${cat._id}: ${cat.count} tours`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();
