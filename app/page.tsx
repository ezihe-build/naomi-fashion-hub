'use client';

import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';

import { 
  Canvas 
} from '@react-three/fiber';
import { 
  useFBX, OrbitControls, Stage 
} from '@react-three/drei';
import {
  X, Save, Undo2, Redo2, Camera, ShoppingBag, Heart, User,
  Shirt, Footprints, Glasses, Watch, Backpack, Palette,
  Sparkles, Check, Gem, Crown, Clock,
  Star, TrendingUp, Zap, Award, Briefcase, Flag, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- ADD THIS COMPONENT HERE ---
function AvatarModel() {
  const fbx = useFBX('/models/model.fbx');
  return <primitive object={fbx} scale={0.005} />;
}
// -------------------------------

const COLOR_SWATCHES = [
  { id:'skin-1', hex:'#f5d0b5', label:'Light' },
  { id:'skin-2', hex:'#e0ac69', label:'Medium' },
  { id:'skin-3', hex:'#c68642', label:'Tan' },
  { id:'skin-4', hex:'#8d5524', label:'Dark' },
  { id:'skin-5', hex:'#573618', label:'Deep' },
  { id:'skin-6', hex:'#3d2314', label:'Ebony' },
  { id:'hair-1', hex:'#1a1a1a', label:'Black' },
  { id:'hair-2', hex:'#4a3b2a', label:'Brown' },
  { id:'hair-3', hex:'#d4a574', label:'Blonde' },
  { id:'hair-4', hex:'#c41e3a', label:'Red' },
  { id:'hair-5', hex:'#f0f0f0', label:'White' },
  { id:'hair-6', hex:'#8b4513', label:'Auburn' },
  { id:'cloth-1', hex:'#1e3a8a', label:'Navy' },
  { id:'cloth-2', hex:'#dc2626', label:'Red' },
  { id:'cloth-3', hex:'#16a34a', label:'Green' },
  { id:'cloth-4', hex:'#ca8a04', label:'Gold' },
  { id:'cloth-5', hex:'#9333ea', label:'Purple' },
  { id:'cloth-6', hex:'#ec4899', label:'Pink' },
  { id:'cloth-7', hex:'#f97316', label:'Orange' },
  { id:'cloth-8', hex:'#06b6d4', label:'Cyan' },
];

const CATEGORIES = {
  fashion: [
    { id:'men-tops', label:"Men's Tops", icon:Shirt },
    { id:'men-bottoms', label:"Men's Bottoms", icon:Footprints },
    { id:'men-suits', label:"Men's Suits", icon:Briefcase },
    { id:'men-outerwear', label:"Men's Outerwear", icon:Star },
    { id:'men-shoes', label:"Men's Shoes", icon:Footprints },
    { id:'women-tops', label:"Women's Tops", icon:Shirt },
    { id:'women-bottoms', label:"Women's Bottoms", icon:Footprints },
    { id:'women-dresses', label:"Dresses", icon:Crown },
    { id:'women-outerwear', label:"Women's Coats", icon:Star },
    { id:'women-shoes', label:"Women's Shoes", icon:Footprints },
    { id:'accessories', label:"Accessories", icon:Watch },
    { id:'luxury', label:"Luxury", icon:Gem },
    { id:'streetwear', label:"Streetwear", icon:TrendingUp },
    { id:'sportswear', label:"Sportswear", icon:Zap },
    { id:'traditional', label:"Traditional", icon:Flag },
  ],
  closet: [
    { id:'favorites', label:'Favorites', icon:Heart },
    { id:'recent', label:'Recent', icon:Clock },
    { id:'saved', label:'Saved', icon:Star },
    { id:'outfits', label:'Outfits', icon:ShoppingBag },
  ],
  avatar: [
    { id:'face', label:'Face', icon:User },
    { id:'skin', label:'Skin', icon:Palette },
    { id:'hair', label:'Hair', icon:Sparkles },
    { id:'eyes', label:'Eyes', icon:Glasses },
    { id:'body', label:'Body', icon:User },
  ],
};

interface ItemData {
  id: string;
  name: string;
  brand: string;
  color: string;
  price: string;
  gender: 'M'|'W'|'U';
  type: string;
}

const ITEMS: Record<string, ItemData[]> = {
  'men-tops': [
    { id:'mt-001', name:'Classic Oxford Shirt', brand:'Ralph Lauren', color:'#1e3a8a', price:'₦85,000', gender:'M', type:'Shirt' },
    { id:'mt-002', name:'Polo Bear Tee', brand:'Ralph Lauren', color:'#ffffff', price:'₦45,000', gender:'M', type:'T-Shirt' },
    { id:'mt-003', name:'Monogram Dress Shirt', brand:'Louis Vuitton', color:'#4a3b2a', price:'₦320,000', gender:'M', type:'Shirt' },
    { id:'mt-004', name:'GG Supreme Tee', brand:'Gucci', color:'#c0c0c0', price:'₦280,000', gender:'M', type:'T-Shirt' },
    { id:'mt-005', name:'Check Flannel Shirt', brand:'Burberry', color:'#8b4513', price:'₦195,000', gender:'M', type:'Shirt' },
    { id:'mt-006', name:'Crew Neck Sweater', brand:'Hermès', color:'#d4a574', price:'₦450,000', gender:'M', type:'Sweater' },
    { id:'mt-007', name:'Cashmere Turtleneck', brand:'Loro Piana', color:'#1a1a1a', price:'₦380,000', gender:'M', type:'Sweater' },
    { id:'mt-008', name:'Logo Hoodie', brand:'Balenciaga', color:'#333333', price:'₦290,000', gender:'M', type:'Hoodie' },
    { id:'mt-009', name:'Essentials Tee', brand:'Fear of God', color:'#f5f5f5', price:'₦75,000', gender:'M', type:'T-Shirt' },
    { id:'mt-010', name:'Vintage Washed Tee', brand:'Amiri', color:'#6b7280', price:'₦120,000', gender:'M', type:'T-Shirt' },
    { id:'mt-011', name:'Camp Collar Shirt', brand:'Prada', color:'#16a34a', price:'₦210,000', gender:'M', type:'Shirt' },
    { id:'mt-012', name:'Silk Bowling Shirt', brand:'Versace', color:'#ec4899', price:'₦175,000', gender:'M', type:'Shirt' },
    { id:'mt-013', name:'Denim Western Shirt', brand:'Saint Laurent', color:'#4a6fa5', price:'₦165,000', gender:'M', type:'Shirt' },
    { id:'mt-014', name:'Stripe Breton Tee', brand:'Saint James', color:'#1e3a8a', price:'₦35,000', gender:'M', type:'T-Shirt' },
    { id:'mt-015', name:'Henley Long Sleeve', brand:'Abercrombie', color:'#8d5524', price:'₦28,000', gender:'M', type:'Shirt' },
    { id:'mt-016', name:'Linen Resort Shirt', brand:'Orlebar Brown', color:'#f5d0b5', price:'₦95,000', gender:'M', type:'Shirt' },
    { id:'mt-017', name:'Pique Polo', brand:'Lacoste', color:'#16a34a', price:'₦42,000', gender:'M', type:'Polo' },
    { id:'mt-018', name:'Merino Wool Polo', brand:'John Smedley', color:'#1a1a1a', price:'₦68,000', gender:'M', type:'Polo' },
    { id:'mt-019', name:'Graphic Print Tee', brand:'Off-White', color:'#ffffff', price:'₦150,000', gender:'M', type:'T-Shirt' },
    { id:'mt-020', name:'Boxy Fit Tee', brand:'Acne Studios', color:'#9ca3af', price:'₦88,000', gender:'M', type:'T-Shirt' },
  ],
  'men-bottoms': [
    { id:'mb-001', name:'501 Original Jeans', brand:"Levi's", color:'#4a6fa5', price:'₦35,000', gender:'M', type:'Jeans' },
    { id:'mb-002', name:'Slim Fit Chinos', brand:'Bonobos', color:'#d4a574', price:'₦42,000', gender:'M', type:'Chinos' },
    { id:'mb-003', name:'Pleated Wool Trousers', brand:'Thom Browne', color:'#9ca3af', price:'₦195,000', gender:'M', type:'Trousers' },
    { id:'mb-004', name:'Tech Fleece Joggers', brand:'Nike', color:'#1a1a1a', price:'₦55,000', gender:'M', type:'Joggers' },
    { id:'mb-005', name:'Cargo Pants', brand:'Stone Island', color:'#2d5a27', price:'₦145,000', gender:'M', type:'Cargo' },
    { id:'mb-006', name:'Relaxed Fit Denim', brand:'A.P.C.', color:'#4a6fa5', price:'₦78,000', gender:'M', type:'Jeans' },
    { id:'mb-007', name:'Drawstring Linen Pants', brand:'Zegna', color:'#f5d0b5', price:'₦165,000', gender:'M', type:'Linen' },
    { id:'mb-008', name:'Track Pants', brand:'Adidas Originals', color:'#1a1a1a', price:'₦38,000', gender:'M', type:'Track' },
    { id:'mb-009', name:'Cropped Wide Leg', brand:'Jil Sander', color:'#c0c0c0', price:'₦210,000', gender:'M', type:'Trousers' },
    { id:'mb-010', name:'Distressed Denim', brand:'Ksubi', color:'#6b7280', price:'₦95,000', gender:'M', type:'Jeans' },
    { id:'mb-011', name:'Gurkha Shorts', brand:'Rubinacci', color:'#d4a574', price:'₦68,000', gender:'M', type:'Shorts' },
    { id:'mb-012', name:'Swim Trunks', brand:'Orlebar Brown', color:'#1e3a8a', price:'₦52,000', gender:'M', type:'Swim' },
    { id:'mb-013', name:'Corduroy Pants', brand:'Polo Ralph Lauren', color:'#8b4513', price:'₦58,000', gender:'M', type:'Corduroy' },
    { id:'mb-014', name:'Sweatpants', brand:'Champion Reverse', color:'#9ca3af', price:'₦25,000', gender:'M', type:'Sweatpants' },
    { id:'mb-015', name:'Selvedge Denim', brand:'Alden', color:'#4a6fa5', price:'₦125,000', gender:'M', type:'Jeans' },
  ],
  'men-suits': [
    { id:'ms-001', name:'Navy Two-Piece Suit', brand:'Hugo Boss', color:'#1e3a8a', price:'₦185,000', gender:'M', type:'Suit' },
    { id:'ms-002', name:'Charcoal Three-Piece', brand:'Canali', color:'#4a4a4a', price:'₦320,000', gender:'M', type:'Suit' },
    { id:'ms-003', name:'Tuxedo Black Tie', brand:'Tom Ford', color:'#1a1a1a', price:'₦850,000', gender:'M', type:'Tuxedo' },
    { id:'ms-004', name:'Linen Summer Suit', brand:'L.B.M. 1911', color:'#f5d0b5', price:'₦145,000', gender:'M', type:'Suit' },
    { id:'ms-005', name:'Plaid Power Suit', brand:'Etro', color:'#8b4513', price:'₦275,000', gender:'M', type:'Suit' },
    { id:'ms-006', name:'Double-Breasted Navy', brand:'Brunello Cucinelli', color:'#1e3a8a', price:'₦520,000', gender:'M', type:'Suit' },
    { id:'ms-007', name:'Slim Fit Dinner Jacket', brand:'Dolce & Gabbana', color:'#1a1a1a', price:'₦380,000', gender:'M', type:'Jacket' },
    { id:'ms-008', name:'Seersucker Suit', brand:'Brooks Brothers', color:'#9ca3af', price:'₦95,000', gender:'M', type:'Suit' },
    { id:'ms-009', name:'Velvet Smoking Jacket', brand:'Dunhill', color:'#4a0e4e', price:'₦210,000', gender:'M', type:'Jacket' },
    { id:'ms-010', name:'White Dinner Jacket', brand:'Ralph Lauren', color:'#ffffff', price:'₦195,000', gender:'M', type:'Jacket' },
    { id:'ms-011', name:'Morning Coat', brand:'Gieves & Hawkes', color:'#1a1a1a', price:'₦450,000', gender:'M', type:'Formal' },
    { id:'ms-012', name:'Italian Cut Suit', brand:'Kiton', color:'#4a6fa5', price:'₦1,200,000', gender:'M', type:'Suit' },
  ],
  'men-outerwear': [
    { id:'mo-001', name:'Trench Coat', brand:'Burberry', color:'#8b4513', price:'₦450,000', gender:'M', type:'Coat' },
    { id:'mo-002', name:'Down Puffer Jacket', brand:'Moncler', color:'#1a1a1a', price:'₦380,000', gender:'M', type:'Puffer' },
    { id:'mo-003', name:'Leather Biker Jacket', brand:'Schott NYC', color:'#1a1a1a', price:'₦165,000', gender:'M', type:'Leather' },
    { id:'mo-004', name:'Varsity Jacket', brand:'Golden Bear', color:'#1a1a1a', price:'₦95,000', gender:'M', type:'Varsity' },
    { id:'mo-005', name:'Wool Overcoat', brand:'Acne Studios', color:'#4a4a4a', price:'₦210,000', gender:'M', type:'Overcoat' },
    { id:'mo-006', name:'Denim Jacket', brand:"Levi's", color:'#4a6fa5', price:'₦42,000', gender:'M', type:'Denim' },
    { id:'mo-007', name:'Bomber Jacket', brand:'Alpha Industries', color:'#2d5a27', price:'₦68,000', gender:'M', type:'Bomber' },
    { id:'mo-008', name:'Parka', brand:'Canada Goose', color:'#1a1a1a', price:'₦520,000', gender:'M', type:'Parka' },
    { id:'mo-009', name:'Field Jacket', brand:'Barbour', color:'#2d5a27', price:'₦125,000', gender:'M', type:'Field' },
    { id:'mo-010', name:'Peacoat', brand:'Saint Laurent', color:'#1a1a1a', price:'₦195,000', gender:'M', type:'Peacoat' },
    { id:'mo-011', name:'Shearling Jacket', brand:'Acne Studios', color:'#d4a574', price:'₦320,000', gender:'M', type:'Shearling' },
    { id:'mo-012', name:'Windbreaker', brand:'Patagonia', color:'#16a34a', price:'₦55,000', gender:'M', type:'Windbreaker' },
    { id:'mo-013', name:'Military Jacket', brand:'RRL', color:'#2d5a27', price:'₦145,000', gender:'M', type:'Military' },
    { id:'mo-014', name:'Cardigan', brand:'Inis Meáin', color:'#d4a574', price:'₦85,000', gender:'M', type:'Cardigan' },
    { id:'mo-015', name:'Blazer', brand:'Unstructured', color:'#4a4a4a', price:'₦125,000', gender:'M', type:'Blazer' },
  ],
  'men-shoes': [
    { id:'msh-001', name:'Air Jordan 1 High', brand:'Nike', color:'#dc2626', price:'₦95,000', gender:'M', type:'Sneakers' },
    { id:'msh-002', name:'Stan Smith', brand:'Adidas', color:'#ffffff', price:'₦42,000', gender:'M', type:'Sneakers' },
    { id:'msh-003', name:'Common Projects Achilles', brand:'Common Projects', color:'#ffffff', price:'₦145,000', gender:'M', type:'Sneakers' },
    { id:'msh-004', name:'Loafer Weejuns', brand:'G.H. Bass', color:'#4a3b2a', price:'₦68,000', gender:'M', type:'Loafers' },
    { id:'msh-005', name:'Chelsea Boot', brand:'Common Projects', color:'#1a1a1a', price:'₦185,000', gender:'M', type:'Boots' },
    { id:'msh-006', name:'Oxford Cap-Toe', brand:"Church's", color:'#4a3b2a', price:'₦210,000', gender:'M', type:'Oxfords' },
    { id:'msh-007', name:'Desert Boot', brand:'Clarks', color:'#d4a574', price:'₦35,000', gender:'M', type:'Boots' },
    { id:'msh-008', name:'Running Shoe', brand:'Hoka', color:'#f97316', price:'₦58,000', gender:'M', type:'Running' },
    { id:'msh-009', name:'Monk Strap', brand:'Magnanni', color:'#4a3b2a', price:'₦125,000', gender:'M', type:'Monk' },
    { id:'msh-010', name:'Yeezy Boost 350', brand:'Adidas Yeezy', color:'#c0c0c0', price:'₦145,000', gender:'M', type:'Sneakers' },
    { id:'msh-011', name:'Wallabee', brand:'Clarks', color:'#d4a574', price:'₦42,000', gender:'M', type:'Boots' },
    { id:'msh-012', name:'Combat Boot', brand:'Dr. Martens', color:'#1a1a1a', price:'₦55,000', gender:'M', type:'Boots' },
    { id:'msh-013', name:'Driving Moccasin', brand:"Tod's", color:'#4a3b2a', price:'₦165,000', gender:'M', type:'Moccasin' },
    { id:'msh-014', name:'Slip-On Vans', brand:'Vans', color:'#1a1a1a', price:'₦22,000', gender:'M', type:'Sneakers' },
    { id:'msh-015', name:'Birkenstock Boston', brand:'Birkenstock', color:'#d4a574', price:'₦38,000', gender:'M', type:'Sandals' },
  ],
  'women-tops': [
    { id:'wt-001', name:'Silk Blouse', brand:'Equipment', color:'#f5f5f5', price:'₦125,000', gender:'W', type:'Blouse' },
    { id:'wt-002', name:'Cashmere Crewneck', brand:'N.Peal', color:'#d4a574', price:'₦185,000', gender:'W', type:'Sweater' },
    { id:'wt-003', name:'Logo Tee', brand:'Gucci', color:'#ffffff', price:'₦195,000', gender:'W', type:'T-Shirt' },
    { id:'wt-004', name:'Wrap Top', brand:'Diane von Furstenberg', color:'#ec4899', price:'₦145,000', gender:'W', type:'Top' },
    { id:'wt-005', name:'Bodysuit', brand:'Skims', color:'#1a1a1a', price:'₦35,000', gender:'W', type:'Bodysuit' },
    { id:'wt-006', name:'Cropped Cardigan', brand:'Miu Miu', color:'#f5f5f5', price:'₦210,000', gender:'W', type:'Cardigan' },
    { id:'wt-007', name:'Linen Shirt', brand:'Frank & Eileen', color:'#f5d0b5', price:'₦68,000', gender:'W', type:'Shirt' },
    { id:'wt-008', name:'Turtleneck', brand:'COS', color:'#1a1a1a', price:'₦42,000', gender:'W', type:'Turtleneck' },
    { id:'wt-009', name:'Puff Sleeve Top', brand:'Ulla Johnson', color:'#ec4899', price:'₦95,000', gender:'W', type:'Top' },
    { id:'wt-010', name:'Ribbed Tank', brand:'Reformation', color:'#1a1a1a', price:'₦28,000', gender:'W', type:'Tank' },
    { id:'wt-011', name:'Peplum Blouse', brand:'Self-Portrait', color:'#ffffff', price:'₦165,000', gender:'W', type:'Blouse' },
    { id:'wt-012', name:'Off-Shoulder Top', brand:'Jacquemus', color:'#f5d0b5', price:'₦125,000', gender:'W', type:'Top' },
    { id:'wt-013', name:'Graphic Tee', brand:'Balenciaga', color:'#9ca3af', price:'₦145,000', gender:'W', type:'T-Shirt' },
    { id:'wt-014', name:'Corset Top', brand:'Dion Lee', color:'#1a1a1a', price:'₦110,000', gender:'W', type:'Corset' },
    { id:'wt-015', name:'Henley', brand:"L'Agence", color:'#d4a574', price:'₦58,000', gender:'W', type:'Henley' },
  ],
  'women-bottoms': [
    { id:'wb-001', name:'High-Rise Skinny Jeans', brand:'Mother', color:'#4a6fa5', price:'₦85,000', gender:'W', type:'Jeans' },
    { id:'wb-002', name:'Pleated Midi Skirt', brand:'Pleats Please', color:'#9ca3af', price:'₦125,000', gender:'W', type:'Skirt' },
    { id:'wb-003', name:'Wide Leg Trousers', brand:'The Row', color:'#1a1a1a', price:'₦210,000', gender:'W', type:'Trousers' },
    { id:'wb-004', name:'Leather Mini Skirt', brand:'Saint Laurent', color:'#1a1a1a', price:'₦185,000', gender:'W', type:'Skirt' },
    { id:'wb-005', name:'Paperbag Waist Pants', brand:'Aritzia', color:'#d4a574', price:'₦52,000', gender:'W', type:'Pants' },
    { id:'wb-006', name:'Culottes', brand:'Celine', color:'#f5f5f5', price:'₦145,000', gender:'W', type:'Culottes' },
    { id:'wb-007', name:'Denim Shorts', brand:'AGOLDE', color:'#4a6fa5', price:'₦38,000', gender:'W', type:'Shorts' },
    { id:'wb-008', name:'Palazzo Pants', brand:'Zimmermann', color:'#ec4899', price:'₦165,000', gender:'W', type:'Pants' },
    { id:'wb-009', name:'Biker Shorts', brand:'Alo Yoga', color:'#1a1a1a', price:'₦28,000', gender:'W', type:'Shorts' },
    { id:'wb-010', name:'Cargo Pants', brand:'Dickies', color:'#2d5a27', price:'₦35,000', gender:'W', type:'Cargo' },
    { id:'wb-011', name:'Wrap Skirt', brand:'DVF', color:'#ec4899', price:'₦95,000', gender:'W', type:'Skirt' },
    { id:'wb-012', name:'Linen Pants', brand:'Faithfull', color:'#f5d0b5', price:'₦68,000', gender:'W', type:'Linen' },
  ],
  'women-dresses': [
    { id:'wd-001', name:'Little Black Dress', brand:'Chanel', color:'#1a1a1a', price:'₦450,000', gender:'W', type:'Cocktail' },
    { id:'wd-002', name:'Slip Dress', brand:'Nili Lotan', color:'#c0c0c0', price:'₦125,000', gender:'W', type:'Evening' },
    { id:'wd-003', name:'Wrap Dress', brand:'DVF', color:'#ec4899', price:'₦145,000', gender:'W', type:'Day' },
    { id:'wd-004', name:'Shirt Dress', brand:'Ralph Lauren', color:'#1e3a8a', price:'₦95,000', gender:'W', type:'Casual' },
    { id:'wd-005', name:'Maxi Floral', brand:'Farm Rio', color:'#16a34a', price:'₦68,000', gender:'W', type:'Maxi' },
    { id:'wd-006', name:'Ball Gown', brand:'Oscar de la Renta', color:'#1a1a1a', price:'₦850,000', gender:'W', type:'Gown' },
    { id:'wd-007', name:'Sundress', brand:'Reformation', color:'#f5d0b5', price:'₦58,000', gender:'W', type:'Casual' },
    { id:'wd-008', name:'Bodycon', brand:'Hervé Léger', color:'#1a1a1a', price:'₦210,000', gender:'W', type:'Evening' },
    { id:'wd-009', name:'Tea Dress', brand:'HVN', color:'#ec4899', price:'₦85,000', gender:'W', type:'Day' },
    { id:'wd-010', name:'Midi Dress', brand:'Ganni', color:'#9ca3af', price:'₦75,000', gender:'W', type:'Midi' },
    { id:'wd-011', name:'Halter Gown', brand:'Badgley Mischka', color:'#1a1a1a', price:'₦320,000', gender:'W', type:'Gown' },
    { id:'wd-012', name:'T-Shirt Dress', brand:'COS', color:'#1a1a1a', price:'₦35,000', gender:'W', type:'Casual' },
    { id:'wd-013', name:'Lace Dress', brand:'Self-Portrait', color:'#f5f5f5', price:'₦185,000', gender:'W', type:'Cocktail' },
    { id:'wd-014', name:'Denim Dress', brand:'Ganni', color:'#4a6fa5', price:'₦68,000', gender:'W', type:'Casual' },
    { id:'wd-015', name:'Kaftan', brand:'Dodo Bar Or', color:'#ec4899', price:'₦125,000', gender:'W', type:'Resort' },
  ],
  'women-outerwear': [
    { id:'wo-001', name:'Trench Coat', brand:'Burberry', color:'#8b4513', price:'₦450,000', gender:'W', type:'Coat' },
    { id:'wo-002', name:'Wool Coat', brand:'Max Mara', color:'#d4a574', price:'₦320,000', gender:'W', type:'Coat' },
    { id:'wo-003', name:'Puffer Jacket', brand:'Mackage', color:'#1a1a1a', price:'₦185,000', gender:'W', type:'Puffer' },
    { id:'wo-004', name:'Faux Fur Coat', brand:'Stella McCartney', color:'#f5f5f5', price:'₦275,000', gender:'W', type:'Fur' },
    { id:'wo-005', name:'Denim Jacket', brand:'Acne Studios', color:'#4a6fa5', price:'₦125,000', gender:'W', type:'Denim' },
    { id:'wo-006', name:'Bomber Jacket', brand:'Alpha Industries', color:'#2d5a27', price:'₦68,000', gender:'W', type:'Bomber' },
    { id:'wo-007', name:'Cape', brand:'Chloé', color:'#d4a574', price:'₦210,000', gender:'W', type:'Cape' },
    { id:'wo-008', name:'Cardigan', brand:'Khaite', color:'#f5f5f5', price:'₦145,000', gender:'W', type:'Cardigan' },
    { id:'wo-009', name:'Peacoat', brand:'J.Crew', color:'#1a1a1a', price:'₦85,000', gender:'W', type:'Peacoat' },
    { id:'wo-010', name:'Shearling Coat', brand:'Totême', color:'#d4a574', price:'₦380,000', gender:'W', type:'Shearling' },
    { id:'wo-011', name:'Raincoat', brand:'Rains', color:'#f5f5f5', price:'₦42,000', gender:'W', type:'Rain' },
    { id:'wo-012', name:'Blazer', brand:'Blazé Milano', color:'#1a1a1a', price:'₦165,000', gender:'W', type:'Blazer' },
  ],
  'women-shoes': [
    { id:'wsh-001', name:'Pump 85mm', brand:'Manolo Blahnik', color:'#1a1a1a', price:'₦450,000', gender:'W', type:'Pumps' },
    { id:'wsh-002', name:'Ballet Flat', brand:'Chanel', color:'#1a1a1a', price:'₦320,000', gender:'W', type:'Flats' },
    { id:'wsh-003', name:'Air Force 1', brand:'Nike', color:'#ffffff', price:'₦55,000', gender:'W', type:'Sneakers' },
    { id:'wsh-004', name:'Ankle Boot', brand:'Acne Studios', color:'#1a1a1a', price:'₦145,000', gender:'W', type:'Boots' },
    { id:'wsh-005', name:'Espadrille Wedge', brand:'Castañer', color:'#d4a574', price:'₦68,000', gender:'W', type:'Wedges' },
    { id:'wsh-006', name:'Loafer', brand:'Gucci', color:'#4a3b2a', price:'₦210,000', gender:'W', type:'Loafers' },
    { id:'wsh-007', name:'Strappy Sandal', brand:'Aquazzura', color:'#f5f5f5', price:'₦185,000', gender:'W', type:'Sandals' },
    { id:'wsh-008', name:'Running Shoe', brand:'Hoka', color:'#f97316', price:'₦58,000', gender:'W', type:'Running' },
    { id:'wsh-009', name:'Knee-High Boot', brand:'Stuart Weitzman', color:'#1a1a1a', price:'₦210,000', gender:'W', type:'Boots' },
    { id:'wsh-010', name:'Mule', brand:'Bottega Veneta', color:'#16a34a', price:'₦275,000', gender:'W', type:'Mules' },
    { id:'wsh-011', name:'Platform Sneaker', brand:'Converse', color:'#ffffff', price:'₦35,000', gender:'W', type:'Sneakers' },
    { id:'wsh-012', name:'Slingback', brand:'Prada', color:'#1a1a1a', price:'₦195,000', gender:'W', type:'Slingbacks' },
    { id:'wsh-013', name:'Combat Boot', brand:'Dr. Martens', color:'#1a1a1a', price:'₦55,000', gender:'W', type:'Boots' },
    { id:'wsh-014', name:'Slide', brand:'Birkenstock', color:'#d4a574', price:'₦28,000', gender:'W', type:'Sandals' },
    { id:'wsh-015', name:'Mary Jane', brand:'Miu Miu', color:'#1a1a1a', price:'₦245,000', gender:'W', type:'Mary Janes' },
  ],
  'accessories': [
    { id:'acc-001', name:'Classic Flap Bag', brand:'Chanel', color:'#1a1a1a', price:'₦2,500,000', gender:'W', type:'Handbag' },
    { id:'acc-002', name:'Birkin 30', brand:'Hermès', color:'#d4a574', price:'₦4,200,000', gender:'W', type:'Handbag' },
    { id:'acc-003', name:'Neverfull MM', brand:'Louis Vuitton', color:'#c0c0c0', price:'₦850,000', gender:'W', type:'Tote' },
    { id:'acc-004', name:'GG Marmont Belt', brand:'Gucci', color:'#1a1a1a', price:'₦145,000', gender:'U', type:'Belt' },
    { id:'acc-005', name:'Aviator Classic', brand:'Ray-Ban', color:'#1a1a1a', price:'₦68,000', gender:'U', type:'Sunglasses' },
    { id:'acc-006', name:'Wayfarer', brand:'Ray-Ban', color:'#1a1a1a', price:'₦58,000', gender:'U', type:'Sunglasses' },
    { id:'acc-007', name:'Submariner', brand:'Rolex', color:'#1a1a1a', price:'₦3,800,000', gender:'M', type:'Watch' },
    { id:'acc-008', name:'Tank Must', brand:'Cartier', color:'#c0c0c0', price:'₦1,200,000', gender:'W', type:'Watch' },
    { id:'acc-009', name:'Love Bracelet', brand:'Cartier', color:'#ffd700', price:'₦850,000', gender:'U', type:'Jewelry' },
    { id:'acc-010', name:'Alhambra Necklace', brand:'Van Cleef', color:'#ffd700', price:'₦1,500,000', gender:'W', type:'Jewelry' },
    { id:'acc-011', name:'Silk Scarf', brand:'Hermès', color:'#ec4899', price:'₦210,000', gender:'W', type:'Scarf' },
    { id:'acc-012', name:'Baseball Cap', brand:'New Era', color:'#1a1a1a', price:'₦15,000', gender:'U', type:'Hat' },
    { id:'acc-013', name:'Beanie', brand:'Carhartt', color:'#1a1a1a', price:'₦12,000', gender:'U', type:'Hat' },
    { id:'acc-014', name:'Tote Bag', brand:'Longchamp', color:'#1a1a1a', price:'₦85,000', gender:'W', type:'Tote' },
    { id:'acc-015', name:'Backpack', brand:'Fjällräven', color:'#2d5a27', price:'₦42,000', gender:'U', type:'Backpack' },
    { id:'acc-016', name:'Crossbody', brand:'Celine', color:'#d4a574', price:'₦320,000', gender:'W', type:'Crossbody' },
    { id:'acc-017', name:'Wallet on Chain', brand:'Chanel', color:'#1a1a1a', price:'₦950,000', gender:'W', type:'Wallet' },
    { id:'acc-018', name:'Leather Gloves', brand:'Dents', color:'#4a3b2a', price:'₦35,000', gender:'U', type:'Gloves' },
    { id:'acc-019', name:'Silk Tie', brand:'Hermès', color:'#1e3a8a', price:'₦68,000', gender:'M', type:'Tie' },
    { id:'acc-020', name:'Pocket Square', brand:'Tom Ford', color:'#ec4899', price:'₦45,000', gender:'M', type:'Square' },
  ],
  'luxury': [
    { id:'lux-001', name:'Haute Couture Gown', brand:'Dior', color:'#f5f5f5', price:'₦5,500,000', gender:'W', type:'Gown' },
    { id:'lux-002', name:'Bespoke Suit', brand:'Savile Row', color:'#1a1a1a', price:'₦2,800,000', gender:'M', type:'Suit' },
    { id:'lux-003', name:'Crocodile Birkin', brand:'Hermès', color:'#d4a574', price:'₦8,500,000', gender:'W', type:'Handbag' },
    { id:'lux-004', name:'Diamond Necklace', brand:'Graff', color:'#ffd700', price:'₦12,000,000', gender:'W', type:'Jewelry' },
    { id:'lux-005', name:'Fur Coat', brand:'Fendi', color:'#d4a574', price:'₦3,200,000', gender:'W', type:'Coat' },
    { id:'lux-006', name:'Limited Sneakers', brand:'Nike x Off-White', color:'#1a1a1a', price:'₦450,000', gender:'U', type:'Sneakers' },
    { id:'lux-007', name:'Evening Clutch', brand:'Judith Leiber', color:'#ffd700', price:'₦850,000', gender:'W', type:'Clutch' },
    { id:'lux-008', name:'Cashmere Overcoat', brand:'Loro Piana', color:'#d4a574', price:'₦1,800,000', gender:'M', type:'Coat' },
    { id:'lux-009', name:'Platinum Watch', brand:'Patek Philippe', color:'#c0c0c0', price:'₦15,000,000', gender:'M', type:'Watch' },
    { id:'lux-010', name:'Embellished Gown', brand:'Elie Saab', color:'#ec4899', price:'₦2,100,000', gender:'W', type:'Gown' },
    { id:'lux-011', name:'Ostrich Leather Bag', brand:'Bottega Veneta', color:'#16a34a', price:'₦1,500,000', gender:'W', type:'Handbag' },
    { id:'lux-012', name:'Velvet Smoking Jacket', brand:'Dunhill', color:'#4a0e4e', price:'₦420,000', gender:'M', type:'Jacket' },
    { id:'lux-013', name:'Pearl Earrings', brand:'Mikimoto', color:'#f5f5f5', price:'₦650,000', gender:'W', type:'Jewelry' },
    { id:'lux-014', name:'Alligator Briefcase', brand:'Berluti', color:'#4a3b2a', price:'₦1,200,000', gender:'M', type:'Briefcase' },
    { id:'lux-015', name:'Silk Kimono', brand:'Guo Pei', color:'#ec4899', price:'₦850,000', gender:'W', type:'Kimono' },
  ],
  'streetwear': [
    { id:'st-001', name:'Box Logo Hoodie', brand:'Supreme', color:'#dc2626', price:'₦125,000', gender:'U', type:'Hoodie' },
    { id:'st-002', name:'Shark Full Zip', brand:'BAPE', color:'#1a1a1a', price:'₦195,000', gender:'U', type:'Hoodie' },
    { id:'st-003', name:'Essentials Sweatpants', brand:'Fear of God', color:'#9ca3af', price:'₦68,000', gender:'U', type:'Sweatpants' },
    { id:'st-004', name:'Dunk Low', brand:'Nike SB', color:'#1a1a1a', price:'₦85,000', gender:'U', type:'Sneakers' },
    { id:'st-005', name:'Travis Scott Tee', brand:'Cactus Jack', color:'#8b4513', price:'₦45,000', gender:'U', type:'T-Shirt' },
    { id:'st-006', name:'Palace Ark Air', brand:'Palace', color:'#2d5a27', price:'₦75,000', gender:'U', type:'Jacket' },
    { id:'st-007', name:'Kith Tee', brand:'Kith', color:'#f5f5f5', price:'₦38,000', gender:'U', type:'T-Shirt' },
    { id:'st-008', name:'Yeezy Gap Hoodie', brand:'Yeezy Gap', color:'#1a1a1a', price:'₦55,000', gender:'U', type:'Hoodie' },
    { id:'st-009', name:'Stüssy Crewneck', brand:'Stüssy', color:'#1a1a1a', price:'₦42,000', gender:'U', type:'Sweater' },
    { id:'st-010', name:'Carhartt WIP Pants', brand:'Carhartt', color:'#2d5a27', price:'₦48,000', gender:'U', type:'Pants' },
    { id:'st-011', name:'OBEY Graphic Tee', brand:'OBEY', color:'#1a1a1a', price:'₦22,000', gender:'U', type:'T-Shirt' },
    { id:'st-012', name:'The North Face Puffer', brand:'Supreme x TNF', color:'#dc2626', price:'₦320,000', gender:'U', type:'Puffer' },
    { id:'st-013', name:'Dickies 874', brand:'Dickies', color:'#8b4513', price:'₦25,000', gender:'U', type:'Pants' },
    { id:'st-014', name:'Vans Vault OG', brand:'Vans', color:'#1a1a1a', price:'₦35,000', gender:'U', type:'Sneakers' },
    { id:'st-015', name:'Rhude Bandana Shirt', brand:'Rhude', color:'#1a1a1a', price:'₦95,000', gender:'U', type:'Shirt' },
  ],
  'sportswear': [
    { id:'sp-001', name:'Tech Fleece Hoodie', brand:'Nike', color:'#1a1a1a', price:'₦55,000', gender:'U', type:'Hoodie' },
    { id:'sp-002', name:'Ultraboost 22', brand:'Adidas', color:'#f5f5f5', price:'₦68,000', gender:'U', type:'Running' },
    { id:'sp-003', name:'Align Leggings', brand:'Lululemon', color:'#1a1a1a', price:'₦42,000', gender:'W', type:'Leggings' },
    { id:'sp-004', name:'Speedo Jammer', brand:'Speedo', color:'#1e3a8a', price:'₦18,000', gender:'M', type:'Swim' },
    { id:'sp-005', name:'Rapha Jersey', brand:'Rapha', color:'#dc2626', price:'₦85,000', gender:'M', type:'Cycling' },
    { id:'sp-006', name:'Tennis Skirt', brand:'Lacoste', color:'#f5f5f5', price:'₦35,000', gender:'W', type:'Tennis' },
    { id:'sp-007', name:'Compression Shorts', brand:'2XU', color:'#1a1a1a', price:'₦22,000', gender:'U', type:'Compression' },
    { id:'sp-008', name:'Golf Polo', brand:'FootJoy', color:'#16a34a', price:'₦28,000', gender:'M', type:'Golf' },
    { id:'sp-009', name:'Yoga Mat Bag', brand:'Manduka', color:'#2d5a27', price:'₦15,000', gender:'U', type:'Gear' },
    { id:'sp-010', name:'Basketball Shorts', brand:'Nike Dri-FIT', color:'#1a1a1a', price:'₦18,000', gender:'M', type:'Shorts' },
    { id:'sp-011', name:'Trail Running Shoe', brand:'Salomon', color:'#2d5a27', price:'₦75,000', gender:'U', type:'Trail' },
    { id:'sp-012', name:'Swimsuit One-Piece', brand:'Speedo', color:'#1a1a1a', price:'₦25,000', gender:'W', type:'Swim' },
    { id:'sp-013', name:'Base Layer', brand:'Under Armour', color:'#1a1a1a', price:'₦18,000', gender:'U', type:'Base' },
    { id:'sp-014', name:'Cricket Whites', brand:'Gray-Nicolls', color:'#f5f5f5', price:'₦35,000', gender:'M', type:'Cricket' },
    { id:'sp-015', name:'Ski Jacket', brand:"Arc'teryx", color:'#f97316', price:'₦145,000', gender:'U', type:'Ski' },
  ],
  'traditional': [
    { id:'tr-001', name:'Agbada Set', brand:'Nigerian Tailor', color:'#1e3a8a', price:'₦125,000', gender:'M', type:'Agbada' },
    { id:'tr-002', name:'Dashiki Shirt', brand:'African Print', color:'#ec4899', price:'₦35,000', gender:'M', type:'Dashiki' },
    { id:'tr-003', name:'Buba & Wrapper', brand:'Aso-Oke', color:'#d4a574', price:'₦85,000', gender:'W', type:'Wrapper' },
    { id:'tr-004', name:'Kimono Robe', brand:'Issey Miyake', color:'#1a1a1a', price:'₦210,000', gender:'U', type:'Kimono' },
    { id:'tr-005', name:'Sari Silk', brand:'Sabyasachi', color:'#ec4899', price:'₦450,000', gender:'W', type:'Sari' },
    { id:'tr-006', name:'Kilt Tartan', brand:'Lochcarron', color:'#dc2626', price:'₦95,000', gender:'M', type:'Kilt' },
    { id:'tr-007', name:'Cheongsam', brand:'Shanghai Tang', color:'#dc2626', price:'₦125,000', gender:'W', type:'Dress' },
    { id:'tr-008', name:'Thobe', brand:'Bisht', color:'#f5f5f5', price:'₦68,000', gender:'M', type:'Thobe' },
    { id:'tr-009', name:'Dirndl', brand:'Lodenfrey', color:'#16a34a', price:'₦85,000', gender:'W', type:'Dirndl' },
    { id:'tr-010', name:'Lederhosen', brand:'Trachten', color:'#d4a574', price:'₦55,000', gender:'M', type:'Lederhosen' },
    { id:'tr-011', name:'Hanbok', brand:'Korean Heritage', color:'#ec4899', price:'₦145,000', gender:'W', type:'Hanbok' },
    { id:'tr-012', name:'Djellaba', brand:'Moroccan Craft', color:'#2d5a27', price:'₦42,000', gender:'M', type:'Djellaba' },
    { id:'tr-013', name:'Ao Dai', brand:'Vietnamese Silk', color:'#ec4899', price:'₦95,000', gender:'W', type:'Ao Dai' },
    { id:'tr-014', name:'Sherwani', brand:'Manyavar', color:'#1e3a8a', price:'₦185,000', gender:'M', type:'Sherwani' },
    { id:'tr-015', name:'Kaftan Royal', brand:'Dodo Bar Or', color:'#ffd700', price:'₦210,000', gender:'W', type:'Kaftan' },
  ],
  'favorites': [
    { id:'fav-001', name:'Varsity Look', brand:'NAOMI', color:'#1a1a1a', price:'Saved', gender:'M', type:'Outfit' },
    { id:'fav-002', name:'Summer Vibes', brand:'NAOMI', color:'#f5d0b5', price:'Saved', gender:'W', type:'Outfit' },
    { id:'fav-003', name:'Boardroom Boss', brand:'NAOMI', color:'#1e3a8a', price:'Saved', gender:'M', type:'Outfit' },
    { id:'fav-004', name:'Date Night', brand:'NAOMI', color:'#ec4899', price:'Saved', gender:'W', type:'Outfit' },
    { id:'fav-005', name:'Street King', brand:'NAOMI', color:'#dc2626', price:'Saved', gender:'U', type:'Outfit' },
    { id:'fav-006', name:'Gym Flow', brand:'NAOMI', color:'#16a34a', price:'Saved', gender:'U', type:'Outfit' },
    { id:'fav-007', name:'Luxury Lounge', brand:'NAOMI', color:'#d4a574', price:'Saved', gender:'W', type:'Outfit' },
    { id:'fav-008', name:'Weekend Casual', brand:'NAOMI', color:'#4a6fa5', price:'Saved', gender:'M', type:'Outfit' },
  ],
  'recent': [
    { id:'rec-001', name:'Just Viewed', brand:'History', color:'#9ca3af', price:'Recent', gender:'U', type:'History' },
  ],
  'saved': [
    { id:'sav-001', name:'Wishlist Item', brand:'Saved', color:'#ffd700', price:'Saved', gender:'U', type:'Wishlist' },
  ],
  'outfits': [
    { id:'out-001', name:'Full Look 1', brand:'NAOMI', color:'#1a1a1a', price:'Custom', gender:'M', type:'Full' },
    { id:'out-002', name:'Full Look 2', brand:'NAOMI', color:'#ec4899', price:'Custom', gender:'W', type:'Full' },
  ],
  'face': [
    { id:'fc-001', name:'Round', brand:'Face', color:'#f5d0b5', price:'Free', gender:'U', type:'Shape' },
    { id:'fc-002', name:'Oval', brand:'Face', color:'#e0ac69', price:'Free', gender:'U', type:'Shape' },
    { id:'fc-003', name:'Square', brand:'Face', color:'#c68642', price:'Free', gender:'U', type:'Shape' },
    { id:'fc-004', name:'Heart', brand:'Face', color:'#8d5524', price:'Free', gender:'U', type:'Shape' },
    { id:'fc-005', name:'Diamond', brand:'Face', color:'#573618', price:'Free', gender:'U', type:'Shape' },
    { id:'fc-006', name:'Long', brand:'Face', color:'#f5d0b5', price:'Free', gender:'U', type:'Shape' },
  ],
  'skin': [
    { id:'sk-001', name:'Porcelain', brand:'Skin', color:'#f5d0b5', price:'Free', gender:'U', type:'Tone' },
    { id:'sk-002', name:'Fair', brand:'Skin', color:'#e8c4a0', price:'Free', gender:'U', type:'Tone' },
    { id:'sk-003', name:'Medium', brand:'Skin', color:'#e0ac69', price:'Free', gender:'U', type:'Tone' },
    { id:'sk-004', name:'Olive', brand:'Skin', color:'#c68642', price:'Free', gender:'U', type:'Tone' },
    { id:'sk-005', name:'Brown', brand:'Skin', color:'#8d5524', price:'Free', gender:'U', type:'Tone' },
    { id:'sk-006', name:'Dark', brand:'Skin', color:'#573618', price:'Free', gender:'U', type:'Tone' },
    { id:'sk-007', name:'Deep', brand:'Skin', color:'#3d2314', price:'Free', gender:'U', type:'Tone' },
    { id:'sk-008', name:'Ebony', brand:'Skin', color:'#22110c', price:'Free', gender:'U', type:'Tone' },
  ],
  'hair': [
    { id:'hr-001', name:'Buzz Cut', brand:'Hair', color:'#1a1a1a', price:'Free', gender:'M', type:'Style' },
    { id:'hr-002', name:'Short Curl', brand:'Hair', color:'#4a3b2a', price:'Free', gender:'M', type:'Style' },
    { id:'hr-003', name:'Afro', brand:'Hair', color:'#1a1a1a', price:'Free', gender:'U', type:'Style' },
    { id:'hr-004', name:'Dreadlocks', brand:'Hair', color:'#573618', price:'Free', gender:'U', type:'Style' },
    { id:'hr-005', name:'Braids', brand:'Hair', color:'#1a1a1a', price:'Free', gender:'W', type:'Style' },
    { id:'hr-006', name:'Long Wave', brand:'Hair', color:'#d4a574', price:'Free', gender:'W', type:'Style' },
    { id:'hr-007', name:'Ponytail', brand:'Hair', color:'#4a3b2a', price:'Free', gender:'W', type:'Style' },
    { id:'hr-008', name:'Bald', brand:'Hair', color:'#f5d0b5', price:'Free', gender:'M', type:'Style' },
    { id:'hr-009', name:'Pixie Cut', brand:'Hair', color:'#1a1a1a', price:'Free', gender:'W', type:'Style' },
    { id:'hr-010', name:'Bob', brand:'Hair', color:'#4a3b2a', price:'Free', gender:'W', type:'Style' },
    { id:'hr-011', name:'Undercut', brand:'Hair', color:'#1a1a1a', price:'Free', gender:'M', type:'Style' },
    { id:'hr-012', name:'Mohawk', brand:'Hair', color:'#c41e3a', price:'Free', gender:'U', type:'Style' },
  ],
  'eyes': [
    { id:'ey-001', name:'Brown', brand:'Eyes', color:'#573618', price:'Free', gender:'U', type:'Color' },
    { id:'ey-002', name:'Hazel', brand:'Eyes', color:'#8d5524', price:'Free', gender:'U', type:'Color' },
    { id:'ey-003', name:'Blue', brand:'Eyes', color:'#4a90e2', price:'Free', gender:'U', type:'Color' },
    { id:'ey-004', name:'Green', brand:'Eyes', color:'#16a34a', price:'Free', gender:'U', type:'Color' },
    { id:'ey-005', name:'Gray', brand:'Eyes', color:'#9ca3af', price:'Free', gender:'U', type:'Color' },
    { id:'ey-006', name:'Amber', brand:'Eyes', color:'#ca8a04', price:'Free', gender:'U', type:'Color' },
  ],
  'body': [
    { id:'bd-001', name:'Slim', brand:'Body', color:'#f5d0b5', price:'Free', gender:'U', type:'Build' },
    { id:'bd-002', name:'Athletic', brand:'Body', color:'#e0ac69', price:'Free', gender:'U', type:'Build' },
    { id:'bd-003', name:'Average', brand:'Body', color:'#c68642', price:'Free', gender:'U', type:'Build' },
    { id:'bd-004', name:'Heavy', brand:'Body', color:'#8d5524', price:'Free', gender:'U', type:'Build' },
    { id:'bd-005', name:'Muscular', brand:'Body', color:'#573618', price:'Free', gender:'U', type:'Build' },
    { id:'bd-006', name:'Petite', brand:'Body', color:'#f5d0b5', price:'Free', gender:'W', type:'Build' },
    { id:'bd-007', name:'Tall', brand:'Body', color:'#e0ac69', price:'Free', gender:'M', type:'Build' },
    { id:'bd-008', name:'Curvy', brand:'Body', color:'#c68642', price:'Free', gender:'W', type:'Build' },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   TYPES & MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
type TabType = 'fashion' | 'closet' | 'avatar';
type GenderFilter = 'all' | 'M' | 'W' | 'U';

interface HistoryState {
  selectedItems: Record<string, string>;
  selectedColors: Record<string, string>;
}

export default function NaomiFashionHub() {
  const [activeTab, setActiveTab] = useState<TabType>('fashion');
  const [activeCategory, setActiveCategory] = useState('men-tops');
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isIframeReady, setIsIframeReady] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');
  const [showGenderFilter, setShowGenderFilter] = useState(false);

  const [history, setHistory] = useState<HistoryState[]>([{ selectedItems: {}, selectedColors: {} }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentCategories = CATEGORIES[activeTab];
  const allItems = ITEMS[activeCategory] || [];
  const currentItems = genderFilter === 'all' 
    ? allItems 
    : allItems.filter(item => item.gender === genderFilter || item.gender === 'U');

  /* -- RPM Iframe Communication -- */
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes('readyplayer.me')) return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data?.eventName === 'v1.frame.ready') setIsIframeReady(true);
        if (data?.eventName === 'v1.avatar.exported') console.log('Avatar URL:', data.data?.url);
      } catch {}
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const postMessageToIframe = useCallback((message: object) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify(message), '*');
    }
  }, []);

  /* -- Actions -- */
  const pushHistory = useCallback((newItems: Record<string, string>, newColors: Record<string, string>) => {
    setHistory(prev => {
      const next = prev.slice(0, historyIndex + 1);
      next.push({ selectedItems: newItems, selectedColors: newColors });
      return next;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const selectItem = (itemId: string) => {
    const newItems = { ...selectedItems, [activeCategory]: itemId };
    setSelectedItems(newItems);
    pushHistory(newItems, selectedColors);
    postMessageToIframe({ target: 'readyplayerme', type: 'setAsset', assetType: activeCategory, assetId: itemId });
  };

  const selectColor = (colorId: string, hex: string) => {
    const newColors = { ...selectedColors, [activeCategory]: colorId };
    setSelectedColors(newColors);
    pushHistory(selectedItems, newColors);
    postMessageToIframe({ target: 'readyplayerme', type: 'setColor', colorType: activeCategory, color: hex });
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setSelectedItems(prev.selectedItems);
      setSelectedColors(prev.selectedColors);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setSelectedItems(next.selectedItems);
      setSelectedColors(next.selectedColors);
    }
  };

  const handleSave = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2500);
    postMessageToIframe({ target: 'readyplayerme', type: 'export' });
  };

  const handleSnapUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackgroundImage(url);
    }
  };

  const clearBackground = () => setBackgroundImage(null);

  useEffect(() => {
    setActiveCategory(currentCategories[0].id);
    setShowGenderFilter(activeTab === 'fashion');
  }, [activeTab]);

  return (
    <div className="relative h-screen w-full bg-naomi-bg flex flex-col overflow-hidden">
      {/* ── TOP BAR ── */}
      <header className="flex items-center justify-between px-4 py-3 z-50">
        <button onClick={() => window.location.reload()} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition active:scale-95">
          <X className="w-5 h-5 text-white" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-sm font-bold tracking-widest text-white uppercase">NAOMI FASHION HUB</h1>
          <span className="text-[10px] text-naomi-muted tracking-wider uppercase">SEE IT THEN BE IT</span>
        </div>
        <button onClick={handleSave} className="px-6 py-2 bg-white text-black font-semibold text-sm rounded-full hover:bg-gray-100 transition active:scale-95 shadow-lg">
          Save
        </button>
      </header>

      {/* ── SAVE TOAST ── */}
      <AnimatePresence>
        {showSaveToast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 bg-green-500 text-white rounded-full text-sm font-medium shadow-xl">
            Outfit Saved Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PREVIEW AREA ── */}
      <div className="relative flex-1 min-h-0">
        <AnimatePresence>
          {backgroundImage && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-0">
              <img src={backgroundImage} alt="Background" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-b from-naomi-bg/60 via-transparent to-naomi-bg" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#1a1a1a]">
  {typeof window !== 'undefined' && (
    <Suspense fallback={
      <div className="flex flex-col items-center gap-3 z-20">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="text-sm text-white/60">Loading 3D Model...</p>
      </div>
    }>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 50 }}>
        <Stage environment="city" intensity={0.5} adjustCamera={true}>
          <AvatarModel />
        </Stage>
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 2.2} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
    </Suspense>
  )}
</div> 

        {/* Undo / Redo */}
        <div className="absolute bottom-4 left-4 z-30 flex gap-3">
          <button onClick={undo} disabled={historyIndex <= 0}
            className={cn('w-12 h-12 rounded-full glass-strong flex items-center justify-center transition',
              historyIndex <= 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-95')}>
            <Undo2 className="w-5 h-5" />
          </button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1}
            className={cn('w-12 h-12 rounded-full glass-strong flex items-center justify-center transition',
              historyIndex >= history.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-95')}>
            <Redo2 className="w-5 h-5" />
          </button>
        </div>

        {/* Snap / Background */}
        <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-3">
          {backgroundImage && (
            <button onClick={clearBackground} className="w-12 h-12 rounded-full bg-red-500/80 backdrop-blur-md flex items-center justify-center hover:bg-red-500 transition active:scale-95">
              <X className="w-5 h-5" />
            </button>
          )}
          <button onClick={() => fileInputRef.current?.click()} className="w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:bg-white/20 transition active:scale-95">
            <Camera className="w-5 h-5" />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleSnapUpload} />
        </div>

        {/* Color Swatches */}
        <div className="absolute top-1/2 -translate-y-1/2 right-2 z-30 flex flex-col gap-2">
          {COLOR_SWATCHES.map(swatch => (
            <button key={swatch.id} onClick={() => selectColor(swatch.id, swatch.hex)}
              className={cn('w-8 h-8 rounded-full border-2 transition-all active:scale-90',
                selectedColors[activeCategory] === swatch.id ? 'border-white scale-110 shadow-lg shadow-white/20' : 'border-transparent hover:scale-105')}
              style={{ backgroundColor: swatch.hex }} title={swatch.label}>
              {selectedColors[activeCategory] === swatch.id && <div className="w-full h-full rounded-full border-2 border-white/50" />}
            </button>
          ))}
        </div>
      </div>

      {/* ── BOTTOM SHEET ── */}
      <div className="relative z-40 bg-naomi-bg rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col max-h-[45vh]">
        {/* Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>

        {/* Main Tabs */}
        <div className="flex justify-around px-6 pb-3 border-b border-white/5">
          {[
            { id: 'fashion' as TabType, label: 'Fashion', icon: ShoppingBag },
            { id: 'closet' as TabType, label: 'Closet', icon: Heart },
            { id: 'avatar' as TabType, label: 'Avatar', icon: User },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex flex-col items-center gap-1 py-2 px-4 relative">
              <tab.icon className={cn('w-6 h-6 transition-colors', activeTab === tab.id ? 'text-white' : 'text-naomi-muted')} />
              <span className={cn('text-[10px] font-medium uppercase tracking-wide transition-colors', activeTab === tab.id ? 'text-white' : 'text-naomi-muted')}>
                {tab.label}
              </span>
              {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute -bottom-3 left-0 right-0 h-0.5 bg-white rounded-full" />}
            </button>
          ))}
        </div>

        {/* Gender Filter (Fashion only) */}
        {showGenderFilter && (
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
            <Filter className="w-4 h-4 text-naomi-muted" />
            <div className="flex gap-2">
              {(['all', 'M', 'W'] as const).map(g => (
                <button key={g} onClick={() => setGenderFilter(g)}
                  className={cn('px-3 py-1 rounded-full text-xs font-medium transition-all',
                    genderFilter === g ? 'bg-white text-black' : 'bg-white/5 text-naomi-muted hover:bg-white/10')}>
                  {g === 'all' ? 'All' : g === 'M' ? 'Men' : 'Women'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Slider */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 overflow-x-auto hide-scrollbar">
          {currentCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={cn('flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all active:scale-95',
                  activeCategory === cat.id ? 'bg-white text-black' : 'bg-white/5 text-naomi-muted hover:bg-white/10 hover:text-white')}>
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Item Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            <AnimatePresence mode="popLayout">
              {currentItems.map((item, idx) => {
                const isSelected = selectedItems[activeCategory] === item.id;
                return (
                  <motion.button key={item.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: idx * 0.03 }} onClick={() => selectItem(item.id)}
                    className={cn('relative aspect-square rounded-2xl overflow-hidden transition-all active:scale-95 group',
                      isSelected ? 'ring-2 ring-white shadow-lg shadow-white/10' : 'ring-1 ring-white/5 hover:ring-white/20')}>
                    <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity"
                      style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)` }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
                      <div className="w-10 h-10 rounded-xl shadow-inner" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-medium text-center leading-tight line-clamp-2">{item.name}</span>
                    </div>
                    {/* Brand badge */}
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[8px] font-semibold truncate max-w-[80%]">
                      {item.brand}
                    </div>
                    {/* Price badge */}
                    <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[9px] font-semibold">
                      {item.price}
                    </div>
                    {/* Gender indicator */}
                    <div className={cn('absolute bottom-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold',
                      item.gender === 'M' ? 'bg-blue-500' : item.gender === 'W' ? 'bg-pink-500' : 'bg-purple-500')}>
                      {item.gender}
                    </div>
                    {/* Selected Overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                          <Check className="w-5 h-5 text-black" />
                        </div>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {currentItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-naomi-muted">
              <ShoppingBag className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-sm">No items match your filter</p>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER INFO ── */}
      <footer className="px-4 py-2 bg-naomi-bg border-t border-white/5 text-center z-50">
        <p className="text-[10px] text-naomi-muted">
          MPAMA EGBU OWERRI NORTH LGA &nbsp;|&nbsp; 08163002468 &nbsp;|&nbsp; ogueriamarachi0@gmail.com
        </p>
      </footer>
    </div>
  );
}
