# BadSeal SSR Portfolio

A modern, server-side rendered portfolio website built with Next.js and GraphQL. This project is a revamped version of the original Django-based portfolio, offering improved performance and developer experience.

## 🌐 Live Demo

Visit the live site: [https://badseal-studios.vercel.app/](https://badseal-studios.vercel.app/)

## 🚀 Features

- Server-side rendering for optimal performance and SEO
- GraphQL API integration
- Responsive design with Tailwind CSS
- Image optimization and lazy loading
- PDF viewer integration
- Interactive carousels
- AWS S3 integration for media storage
- MongoDB database integration
- Toast notifications system
- Modal system
- Custom navigation and footer components

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for SSR
- **React** - UI library
- **Apollo Client** - GraphQL client
- **Tailwind CSS** - Utility-first CSS framework
- **FontAwesome** - Icon library
- **Embla Carousel** - Carousel component
- **React PDF** - PDF viewer
- **Formik** - Form handling

### Backend
- **Next.js API Routes** - Backend API
- **Apollo Server Micro** - GraphQL server
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **AWS S3** - Media storage

### DevOps
- **Vercel** - Hosting and deployment
- **Sharp** - Image optimization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 20.x
- npm or yarn
- MongoDB
- AWS Account (for S3 storage)

## 🔧 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/badseal-ssr.git
cd badseal-ssr
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a \`.env.local\` file in the root directory with the following variables:
\`\`\`env
# MongoDB
MONGODB_URI=your_mongodb_uri

# AWS
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name

# App
NEXT_PUBLIC_API_URL=your_api_url
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

## 📁 Project Structure

\`\`\`
badseal-ssr/
├── components/          # React components
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/            # Global styles
├── models/            # Mongoose models
├── operations/        # GraphQL operations
├── resolvers/         # GraphQL resolvers
├── helpers/           # Utility functions
├── dbConfig/          # Database configuration
└── typedefs/          # GraphQL type definitions
\`\`\`

## 🔄 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build production application
- \`npm start\` - Start production server
- \`npm run lint\` - Run ESLint

## 📝 API Documentation

See the [API Documentation](docs/api.md) for detailed information about the GraphQL API.

## 🚀 Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy using Vercel's automatic deployment

## 📞 Support

For support, create an issue in the repository.