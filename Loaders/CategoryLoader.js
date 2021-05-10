import React from 'react'
import { Dimensions } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const {width, height} = Dimensions.get('window')

export default function CategoryLoader() {
    return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" flexWrap='wrap' justifyContent='center' alignItems="center">
        <SkeletonPlaceholder.Item alignItems='center'>
            <SkeletonPlaceholder.Item height={50} width={60} borderRadius={60} margin={5}/>
            {/* <SkeletonPlaceholder.Item height={20} width={50} borderRadius={10}/> */}
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item alignItems='center'>
            <SkeletonPlaceholder.Item height={50} width={60} borderRadius={60} margin={5}/>
            {/* <SkeletonPlaceholder.Item height={20} width={50} borderRadius={10}/> */}
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item alignItems='center'>
            <SkeletonPlaceholder.Item height={50} width={60} borderRadius={60} margin={5}/>
            {/* <SkeletonPlaceholder.Item height={20} width={50} borderRadius={10}/> */}
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item alignItems='center'>
            <SkeletonPlaceholder.Item height={50} width={60} borderRadius={60} margin={5}/>
            {/* <SkeletonPlaceholder.Item height={20} width={50} borderRadius={10}/> */}
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item alignItems='center'>
            <SkeletonPlaceholder.Item height={50} width={60} borderRadius={60} margin={5}/>
            {/* <SkeletonPlaceholder.Item height={20} width={50} borderRadius={10}/> */}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
    )
}
