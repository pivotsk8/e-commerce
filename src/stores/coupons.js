import { useCartStore } from './cart';
import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useCouponStore = defineStore('coupon', () => {
  const cart = useCartStore();
  const couponInput = ref('');
  const couponValidationMessage = ref('');
  const discountPercentage = ref(0);
  const discount = ref(0);

  const VALID_COUPONS = [
    { name: '10DESCUENTO', discount: 0.1 },
    { name: '20DESCUENTO', discount: 0.2 },
  ];

  watch(discountPercentage, () => {
    discount.value = (cart.total * discountPercentage.value).toFixed(2);
  });

  const applyCoupon = () => {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponInput.value)) {
      couponValidationMessage.value = 'Aplicando...';

      setTimeout(() => {
        discountPercentage.value = VALID_COUPONS.find(
          (coupon) => coupon.name === couponInput.value,
        ).discount;
        couponValidationMessage.value = '!Cupon valido¡';
      }, 300);
    } else {
      couponValidationMessage.value = '!Cupon invalido¡';
    }
    setTimeout(() => {
      couponValidationMessage.value = '';
    }, 6000);
  };
  return {
    applyCoupon,
    couponInput,
    couponValidationMessage,
    discount,
  };
});
