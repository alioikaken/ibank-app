import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import { colors } from '../theme';
import type { RootStackParamList, TabParamList } from './types';

import { ChangePasswordScreen, ChangePasswordSuccessScreen, ForgotCodeScreen, ForgotPhoneScreen, SignInScreen, SignUpScreen } from '../screens/auth';
import { AppInformationScreen, ChatScreen, HomeScreen, LanguageScreen, MessagesScreen, SearchScreen, SettingsScreen } from '../screens/main';
import { BranchScreen, ExchangeRateScreen, ExchangeScreen, InterestRateScreen } from '../screens/info';
import {
  AccountCardScreen, AccountManagementScreen, CardDetailScreen, CreditCardScreen, CreditCardSuccessScreen, TransactionReportScreen,
} from '../screens/accounts';
import { AddBeneficiaryScreen, BeneficiaryDetailScreen, BeneficiaryScreen } from '../screens/beneficiary';
import { TransferConfirmScreen, TransferScreen, TransferSuccessScreen } from '../screens/transfer';
import { WithdrawScreen, WithdrawSuccessScreen } from '../screens/withdraw';
import { MobilePrepaidConfirmScreen, MobilePrepaidScreen, MobilePrepaidSuccessScreen } from '../screens/prepaid';
import {
  ElectricBillCodeScreen, ElectricBillDetailScreen, ElectricBillSuccessScreen, InternetBillCodeScreen, InternetBillDetailScreen,
  InternetBillSuccessScreen, PayTheBillScreen, PaymentHistoryScreen,
} from '../screens/bills';
import { SaveOnlineAddScreen, SaveOnlineScreen, SaveOnlineSuccessScreen } from '../screens/save';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  return (
    <Tab.Navigator tabBar={(p) => <TabBar {...p} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const stackNames = [
  'SignIn', 'SignUp', 'ForgotPhone', 'ForgotCode', 'ChangePassword', 'ChangePasswordSuccess', 'Chat', 'Branch', 'InterestRate',
  'ExchangeRate', 'Exchange', 'Language', 'AppInformation', 'AccountCard', 'AccountManagement', 'CardDetail', 'CreditCard',
  'CreditCardSuccess', 'TransactionReport', 'Beneficiary', 'AddBeneficiary', 'BeneficiaryDetail', 'Transfer', 'TransferConfirm',
  'TransferSuccess', 'Withdraw', 'WithdrawSuccess', 'MobilePrepaid', 'MobilePrepaidConfirm', 'MobilePrepaidSuccess', 'PayTheBill',
  'PaymentHistory', 'ElectricBillCode', 'ElectricBillDetail', 'ElectricBillSuccess', 'InternetBillCode', 'InternetBillDetail',
  'InternetBillSuccess', 'SaveOnline', 'SaveOnlineAdd', 'SaveOnlineSuccess',
] as const;

// Deep links (web URLs / app scheme): /transfer, /home, ...
const linking = {
  prefixes: ['ibank://'],
  config: {
    screens: {
      ...Object.fromEntries(stackNames.map((n) => [n, n.toLowerCase()])),
      Tabs: { path: '', screens: { Home: 'home', Search: 'search', Messages: 'messages', Settings: 'settings' } },
    },
  },
};

const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.white, primary: colors.primary } };

export default function Navigation() {
  return (
    <NavigationContainer theme={theme} linking={linking}>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {/* Auth (6) */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPhone" component={ForgotPhoneScreen} />
        <Stack.Screen name="ForgotCode" component={ForgotCodeScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="ChangePasswordSuccess" component={ChangePasswordSuccessScreen} />
        {/* Tabs: Home, Search, Messages, Settings (4) */}
        <Stack.Screen name="Tabs" component={Tabs} options={{ animation: 'fade' }} />
        {/* General (3) */}
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="AppInformation" component={AppInformationScreen} />
        {/* Search tools (4) */}
        <Stack.Screen name="Branch" component={BranchScreen} />
        <Stack.Screen name="InterestRate" component={InterestRateScreen} />
        <Stack.Screen name="ExchangeRate" component={ExchangeRateScreen} />
        <Stack.Screen name="Exchange" component={ExchangeScreen} />
        {/* Accounts & cards (6) */}
        <Stack.Screen name="AccountCard" component={AccountCardScreen} />
        <Stack.Screen name="AccountManagement" component={AccountManagementScreen} />
        <Stack.Screen name="CardDetail" component={CardDetailScreen} />
        <Stack.Screen name="CreditCard" component={CreditCardScreen} />
        <Stack.Screen name="CreditCardSuccess" component={CreditCardSuccessScreen} />
        <Stack.Screen name="TransactionReport" component={TransactionReportScreen} />
        {/* Beneficiary (3) */}
        <Stack.Screen name="Beneficiary" component={BeneficiaryScreen} />
        <Stack.Screen name="AddBeneficiary" component={AddBeneficiaryScreen} />
        <Stack.Screen name="BeneficiaryDetail" component={BeneficiaryDetailScreen} />
        {/* Transfer (3) */}
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen name="TransferConfirm" component={TransferConfirmScreen} />
        <Stack.Screen name="TransferSuccess" component={TransferSuccessScreen} />
        {/* Withdraw (2) */}
        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
        <Stack.Screen name="WithdrawSuccess" component={WithdrawSuccessScreen} />
        {/* Mobile prepaid (3) */}
        <Stack.Screen name="MobilePrepaid" component={MobilePrepaidScreen} />
        <Stack.Screen name="MobilePrepaidConfirm" component={MobilePrepaidConfirmScreen} />
        <Stack.Screen name="MobilePrepaidSuccess" component={MobilePrepaidSuccessScreen} />
        {/* Bills (8) */}
        <Stack.Screen name="PayTheBill" component={PayTheBillScreen} />
        <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
        <Stack.Screen name="ElectricBillCode" component={ElectricBillCodeScreen} />
        <Stack.Screen name="ElectricBillDetail" component={ElectricBillDetailScreen} />
        <Stack.Screen name="ElectricBillSuccess" component={ElectricBillSuccessScreen} />
        <Stack.Screen name="InternetBillCode" component={InternetBillCodeScreen} />
        <Stack.Screen name="InternetBillDetail" component={InternetBillDetailScreen} />
        <Stack.Screen name="InternetBillSuccess" component={InternetBillSuccessScreen} />
        {/* Save online (3) */}
        <Stack.Screen name="SaveOnline" component={SaveOnlineScreen} />
        <Stack.Screen name="SaveOnlineAdd" component={SaveOnlineAddScreen} />
        <Stack.Screen name="SaveOnlineSuccess" component={SaveOnlineSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
