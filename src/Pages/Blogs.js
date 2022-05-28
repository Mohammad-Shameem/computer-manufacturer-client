import React from "react";
import PageTitle from "./Shared/PageTitle/PageTitle";

const Blogs = () => {
  return (
    <div className="mb-16">
      <h1 className="text-4xl font-bold text-center text-[#00008B] mt-3">
        Questions
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Question 1 : How will you improve the performance of a React
              Application?
            </h2>

            <p>
              Imporving Performance in react is a matter of time,it can be done
              by only by hardword to get a quite descipline react app skill and
              make a organize react app nicely. But as a beginner we should
              always remember some points,that can maybe Optimizing performance
              in a React application,
            </p>
            <li>Keeping component state local where necessary.</li>
            <li>
              Memoizing React components to prevent unnecessary re-renders.
            </li>
            <li>Code-splitting in React using dynamic import()</li>
            <li>Windowing or list virtualization in React.</li>
            <li>Lazy loading images in React.</li>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Question 2: How does prototypical inheritance work?
            </h2>

            <p>
              The Prototypal Inheritance is a feature in javascript used to add
              methods and properties in objects. It is a method by which an
              object can inherit the properties and methods of another object.
              Traditionally, in order to get and set the Prototype of an object,
              we use Object. getPrototypeOf and Object.
            </p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Question 3: What is a unit test? Why should write unit tests?
            </h2>

            <p>
              Unit testing ensures that all code meets quality standards before
              it's deployed. This ensures a reliable engineering environment
              where quality is paramount. Over the course of the product
              development life cycle, unit testing saves time and money, and
              helps developers write better code, more efficiently.
            </p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Question 4: Why you do not set the state directly in React. For
              example, if you have const [products, setProducts] = useState([]).
              Why you do not set products = [...] instead, you use the
              setProducts?
            </h2>

            <p>
              We do not set the state directly in React,because if somthing we
              change we can set the vlaue in state by using setState
              function.and its very easy to understand change in for the react.
            </p>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Question 5: You have an array of products. Each product has a
              name, price, description, etc. How will you implement a search to
              find products by name?
            </h2>

            <p>
              I can do it in two ways,one is from backend and another is in
              fontend with array method filter.If i do it with backend,i should
              use project for this.project allow us to get specific data field
              from array.also it can be done with tha filter method in fontend.
            </p>
          </div>
        </div>
      </div>
      <PageTitle title={"blogs"}></PageTitle>
    </div>
  );
};

export default Blogs;
