/* pages/products.js */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchDropdown from '../components/SearchDropdown';

function Products() {
  const [products, setProducts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [filter, setFilter] = useState([,]);
  const nameToURL = {
    Stiizy: 'stiizy',
    Cookies: 'cookies',
    'Khalifa Kush': 'khalifakush',
    Wonderbrett: 'wonderbrett',
    Jeeter: 'jeeter',
    Viola: 'viola',
    'Glass House Farms': 'glasshousefarms',
    'Uncle Arnies': 'unclearnies',
    OnePlant: 'oneplant',
  };

  useEffect(() => {
    loadProducts();
  }, [loadingState]);

  async function updateFilter(field, i) {
    var f = filter;
    f[i] = field;
    setFilter(f);
  }

  async function filterProducts() {
    try {
      const productsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/product/?` +
          new URLSearchParams({
            projecturl: nameToURL[filter[0]] ? nameToURL[filter[0]] : '',
            price: filter[1] ? filter[1] : '',
          }),
        {
          method: 'GET',
          query: {
            projecturl: filter[0],
            price: filter[1],
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const productData = await productsRes.json();
      console.log(productData);
      setProducts(Object.keys(productData).length !== 0 ? productData : []);
      setLoadingState('loaded');
    } catch (e) {
      setProducts([]);
      setLoadingState('loaded');
    }
  }

  async function loadProducts() {
    try {
      const productsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/product/`
      );
      const productData = await productsRes.json();
      setProducts(Object.keys(productData).length !== 0 ? productData : []);
      setLoadingState('loaded');
    } catch (e) {
      setProducts([]);
      setLoadingState('loaded');
    }
  }

  return (
    <div className="flex justify-center flex-col mx-default">
      <div className="p-4">
        <div name="upper" className="py-6">
          <div name="header" className="text-4xl font-bold text-center">
            Order Products
          </div>
          <div
            name="search"
            className="grid grid-cols-4 grid-rows-2 pt-8 space-y-1"
          >
            <div className="text-xl text-center font-semibold">Project</div>
            <div className="text-xl text-center font-semibold">Price</div>
            <div className="text-xl text-center font-semibold">Location</div>
            <div className="text-xl text-center"></div>
            <div className="grid grid-cols-1 px-4">
              <SearchDropdown
                keyy={0}
                updateFilter={updateFilter}
                listName="Project Name"
                listValues={[
                  'Stiizy',
                  'Cookies',
                  'Khalifa Kush',
                  'Wonderbrett',
                  'Jeeter',
                  'Viola',
                  'Glass House Farms',
                  'Uncle Arnies',
                  'OnePlant',
                ]}
              />
            </div>
            <div className="grid grid-cols-1 px-4">
              <SearchDropdown
                keyy={1}
                updateFilter={updateFilter}
                listName="Price Range"
                listValues={['0 - 25', '25 - 50', '50 - 100', '100+']}
              />
            </div>
            <div className="grid grid-cols-1 px-4">
              <div className="justify-center">
                <div className="xl:w-full">
                  <div className="input-group relative flex flex-row items-stretch w-full">
                    <input
                      type="search"
                      className="form-control text-center text-gray-700 relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-textPurple focus:outline-none"
                      placeholder="Input Location"
                      aria-label="Input Location"
                      aria-describedby="button-addon2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 px-4">
              <pinkButton
                onClick={filterProducts}
                className="rounded-xls w-full"
              >
                Search
              </pinkButton>
            </div>
          </div>
        </div>
        {loadingState === 'loaded' && Object.keys(products).length === 0 ? (
          <h1 className="py-10 px-20 text-3xl text-center">
            No Products Found
          </h1>
        ) : (
          <div
            name="lower-products-list"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pt-4 mx-4"
          >
            {products.map((product, i) => (
              <Link href={{ pathname: `/products/${product.address}` }} key={i}>
                <div
                  key={i}
                  className="flex flex-col-reverse shadow rounded-xl overflow-hidden object-contain bg-bgSubsection"
                >
                  <div className="p-4 basis-[1/6]">
                    <p
                      style={{ height: '32px' }}
                      className="text-xl text-center font-semibold line-clamp-1"
                    >
                      {product.nftName}
                    </p>
                    <div className="flex flex-row text-center">
                      <p className="text-md font-bold text-black pt-2 basis-5/12">
                        Price:
                      </p>
                      <p className="text-md font-bold text-black pt-2 basis-6/12">
                        {product.price} XRPL
                      </p>
                    </div>
                  </div>

                  <img
                    src={product.imageLink}
                    className="object-fill mx-auto hover:scale-110 rounded-xl cursor-pointer w-full h-[85%]"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
