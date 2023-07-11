import AmericanExpressIcon from "../assets/icons/americanExpressLogo";
import DinersClubIcon from "../assets/icons/dinersClubLogo";
import DiscoverIcon from "../assets/icons/discoverLogo";
import GooglePayIcon from "../assets/icons/googlePayLogo";
import JCBIcon from "../assets/icons/jcb";
import MastercardIcon from "../assets/icons/masterCardLogo";
import PayPalIcon from "../assets/icons/payPalLogo";
import VisaIcon from "../assets/icons/visaLogo";
import {
  MISSING_CARD_NUMBER,
  PAYMENT_METHOD,
  PAYMENT_METHOD_GOOGLEPAY,
  PAYMENT_METHOD_PAYPAL
} from "../constants";
import { Subscription } from "../types";
import { ReactElement } from "react";

type PaymentMethodProps = {
  icon:  ReactElement | null, 
  description: string,
}

export const getPaymentMethod = (subscription: Subscription): PaymentMethodProps => {
  let paymentMethod: PaymentMethodProps = {
    icon: null,
    description: 'No payment method'
  }

  const crediCardDescription = subscription.endingCardNumber ? `ending in ${subscription.endingCardNumber?.toString()}` : MISSING_CARD_NUMBER

  switch (subscription.paymentMethod?.id) {
    case PAYMENT_METHOD.PayPal:
      paymentMethod = {
        icon: PayPalIcon(),
        description: PAYMENT_METHOD_PAYPAL,
      }
      break;
    case PAYMENT_METHOD.GooglePay:
      paymentMethod = {
        icon: GooglePayIcon(),
        description: PAYMENT_METHOD_GOOGLEPAY,
      }
      break;
    case PAYMENT_METHOD.Visa:
      paymentMethod = {
        icon: VisaIcon(),
        description: crediCardDescription,
      }
      break;
    case PAYMENT_METHOD.Mastercard:
      paymentMethod = {
        icon: MastercardIcon(),
        description: crediCardDescription,
      }
      break;
    case PAYMENT_METHOD.AmericanExpress:
      paymentMethod = {
        icon: AmericanExpressIcon(),
        description: crediCardDescription,
      }
      break;
    case PAYMENT_METHOD.JCB:
      paymentMethod = {
        icon: JCBIcon(),
        description: crediCardDescription,
      }
      break;
    case PAYMENT_METHOD.DinersClub:
      paymentMethod = {
        icon: DinersClubIcon(),
        description: crediCardDescription,
      }
      break;
    case PAYMENT_METHOD.Discover:
      paymentMethod = {
        icon: DiscoverIcon(),
        description: crediCardDescription,
      }
      break;
  }

  return paymentMethod
}
