/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTable } from "@fortawesome/free-solid-svg-icons"
import api from '../../services/productAPI'
import { baseURLAPI } from '../../constants/configAxios'
import NumberFormat from 'react-number-format'

import dayjs from 'dayjs'
import thai from 'dayjs/locale/th'
import relativeTime  from 'dayjs/plugin/relativeTime'
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.locale(thai)
dayjs.extend(relativeTime)
dayjs.extend(buddhistEra)

const ProductList = () => {

  // สร้างตัวแปร state มาเก็บค่า product
  const [products, setProducts] = useState([])

  // console.log(products)
  // console.log(baseURLAPI);

  // กำหนดให้มีการอัพเดทข้อมูลทุกครั้งทุกครั้งที่โหลดหน้านี้
  useEffect(() => {
    readAllProduct()
  },[])

  // อ่านข้อมูลสินค้าทั้งหมด
  const readAllProduct = () =>{
    api.getAllProduct().then(res => {
      setProducts(res.data)
    })
  }

  document.title = "รายการสินค้า"
  return (
    <>
      <div className="flex my-6">
          <h1 className="text-3xl text-black pb-6">Product List</h1>
          <p className="flex-1 text-right">
            <a href="#" className="border-green-500 border-2 rounded-sm px-2 py-1 mb-2 hover:text-white hover:bg-green-500 text-xl">+ เพิ่มรายการ</a>
          </p>
      </div>
      
      <div className="w-full">
        
        <div className="bg-white overflow-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-blue-600 text-white border-gray-200 text-xs">
                <th className="px-5 py-3 border-b-2 text-left font-semibold uppercase tracking-wider">
                  Image
                </th>
                <th className="px-5 py-3 border-b-2 text-left font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 text-left font-semibold uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 text-left font-semibold uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-5 py-3 border-b-2 text-left font-semibold uppercase tracking-wider">
                  Category
                </th>
                <th className="px-5 py-3 border-b-2  text-left font-semibold uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-5 py-3 border-b-2 text-left font-semibold uppercase tracking-wider">
                  Updated at
                </th>
                <th className="px-5 py-3 border-b-2 text-right font-semibold uppercase tracking-wider">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody>

              {
                products.map((product, index) => (
                <tr className="hover:bg-gray-200 border-gray-200 text-md" key={index}>

                  <td className="px-5 py-5 border-b">
                      
                      {
                        product.image[0] ?
                        <img
                            className="w-10 rounded"
                            src={baseURLAPI+product.image[0].url}
                            alt=""
                        />
                        :
                        <img
                            className="w-10 rounded"
                            src='assets/images/noimg.jpg'
                            alt=""
                        />
                      }
                      
                  </td>

                  <td className="px-5 py-5 border-b">
                    <p className="text-gray-900 whitespace-no-wrap">{product.title}</p>
                  </td>

                  <td className="px-5 py-5 border-b">
                    <p className="text-gray-900 whitespace-no-wrap">
                      <NumberFormat 
                        value={product.price} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        fixedDecimalScale={true}
                        decimalScale={2}
                        // prefix={'$'}
                       /> บาท
                    </p>
                  </td>

                  <td className="px-5 py-5 border-b">
                    <p className="text-gray-900 whitespace-no-wrap">
                     {product.qty}
                    </p>
                  </td>

                  <td className="px-5 py-5 border-b ">
                    <p className="text-gray-900 whitespace-no-wrap">
                    {product.category.title}
                    </p>
                  </td>

                  <td className="px-5 py-5 border-b text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">

                    { dayjs(product.created_at).format('D MMM BBBB H:m:s') }

                    </p>
                  </td>

                  <td className="px-5 py-5 border-b text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">

                    { dayjs().to(dayjs(product.updated_at)) }

                    </p>
                  </td>

                  <td className="px-5 py-5 border-b text-sm text-right">
                    <p className="text-gray-900 whitespace-no-wrap">
                      <a href="#" className="border-yellow-500 border-2 rounded-sm px-3 py-1 hover:text-white hover:bg-yellow-500">แก้ไข</a> &nbsp;
                      <a 
                      className="border-red-500 border-2 rounded-sm px-3 py-1 hover:text-white hover:bg-red-500"
                      >ลบออก</a>
                    </p>
                  </td>

                </tr>
                ))
              }
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ProductList
