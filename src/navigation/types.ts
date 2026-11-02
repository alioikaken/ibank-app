import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Messages: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPhone: undefined;
  ForgotCode: { phone: string };
  ChangePassword: { forgot?: boolean } | undefined;
  ChangePasswordSuccess: undefined;
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Chat: { title: string };
  Branch: undefined;
  InterestRate: undefined;
  ExchangeRate: undefined;
  Exchange: undefined;
  Language: undefined;
  AppInformation: undefined;
  AccountCard: { tab?: 'Account' | 'Card' } | undefined;
  AccountManagement: undefined;
  CardDetail: undefined;
  CreditCard: undefined;
  CreditCardSuccess: undefined;
  TransactionReport: undefined;
  Beneficiary: undefined;
  AddBeneficiary: undefined;
  BeneficiaryDetail: { name: string; avatar: string };
  Transfer: undefined;
  TransferConfirm: { to: string; cardNumber: string; amount: string; content: string; bank?: string };
  TransferSuccess: { to: string; amount: string };
  Withdraw: undefined;
  WithdrawSuccess: undefined;
  MobilePrepaid: undefined;
  MobilePrepaidConfirm: { phone: string; amount: string };
  MobilePrepaidSuccess: undefined;
  PayTheBill: undefined;
  PaymentHistory: { tab?: 'Electric' | 'Water' | 'Mobile' | 'Internet' } | undefined;
  ElectricBillCode: undefined;
  ElectricBillDetail: undefined;
  ElectricBillSuccess: undefined;
  InternetBillCode: undefined;
  InternetBillDetail: undefined;
  InternetBillSuccess: undefined;
  SaveOnline: undefined;
  SaveOnlineAdd: undefined;
  SaveOnlineSuccess: undefined;
};

export type RootProps<K extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, K>;
