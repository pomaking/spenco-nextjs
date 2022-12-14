import React from 'react';
import Navbar from "../../components/_App/NavbarTwo";
import PageBannerStyleOne from "../../components/Common/PageBanner/PageBannerStyleOne";
import Link from 'next/link';
import Footer from '../../components/_App/Footer';
import BlogSidebar from '../../components/Blog/BlogSidebar';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_ALL_POSTS } from '../../graphql/queries';
import { DateTime } from 'luxon'

export default function BlogRightSidebar({ posts }) {
    console.log(posts);
    return (
        <>
            <Navbar />

            <PageBannerStyleOne 
                pageTitle="News and Insights" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="News and Insights" 
                BGImage="transparent-bg1" 
            />

            <div className="blog-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="row justify-content-center">
                            {posts.map((val, i) => {
                                return (
                                <div key={i} className="col-lg-6 col-md-6">
                                    <div className="single-post-item startup-color">
                                        <div className="post-image">
                                            <Link href={`/blog/${val.attributes.slug}`}>
                                                <a className="d-block">
                                                    <img src={val.attributes.blogImage.data.attributes.url} alt="image" />
                                                </a>
                                            </Link>
                                        </div>

                                        <div className="post-content">
                                            <ul className="meta">
                                                <li><i className="far fa-calendar-alt"></i>{DateTime.now(val.attributes.updatedAt).toFormat('MMMM dd, yyyy')}</li>
                                                <li><i className="far fa-user-circle"></i> <Link href="/blog"><a>Shelley Percy</a></Link></li>
                                            </ul>

                                            <h3>
                                                <Link href={`/blog/${val.attributes.slug}`}>
                                                    <a>{val.attributes.title}</a>
                                                </Link>
                                            </h3>

                                            <Link href={`/blog/${val.attributes.slug}`}>
                                                <a className="link-btn">
                                                    Read More <i className="fas fa-chevron-right"></i>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
 
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="pagination-area text-center">
                                        <a href="#" className="next page-numbers">
                                            <i className="fas fa-chevron-left"></i>
                                        </a>
                                        <a href="#" className="page-numbers current" aria-current="page">1</a>
                                        <a href="#" className="page-numbers">2</a>
                                        <a href="#" className="page-numbers">3</a>
                                        <a href="#" className="page-numbers">4</a>
                                        <a href="#" className="next page-numbers">
                                            <i className="fas fa-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div className="col-lg-4 col-md-12">
                            <div className="right-sidebar pl-20">
                                <BlogSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
            <Footer />
        </>
    )
}

export async function getStaticProps() {

    const client = new ApolloClient({
        uri: "http://localhost:1337/graphql",
        cache: new InMemoryCache()
    });

    const { data } = await client.query({
        query: GET_ALL_POSTS
      })
 
    return {
        props: {
          posts: data.posts.data
        }
    }
}