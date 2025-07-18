import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SettingsComponent } from './settings/settings.component';
import { SystemComponent } from './system/system.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BranchesComponent } from './branches/branches.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { ViewPurchaseComponent } from './view-purchase/view-purchase.component';
import { ViewBranchesComponent } from './view-branches/view-branches.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'dshboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },

      { path: 'settings', component: SettingsComponent },
      { path: 'changepassword', component: ChangePasswordComponent },

      {
        path: 'view-purchase',
        component: ViewPurchaseComponent,
        children: [{ path: 'purchase', component: PurchasesComponent }],
      },
      { path: 'system', component: SystemComponent },
      // { path: 'invoice', component: InvoicesComponent },
      // { path: 'view-invoice', component: ViewInvoiceComponent },

      {
        path: 'view-invoice',
        component: ViewInvoiceComponent,
        children: [{ path: 'invoice', component: InvoicesComponent }],
      },
      {
        path: 'view-branches',
        component: ViewBranchesComponent,
        children: [{ path: 'branches', component: BranchesComponent }],
      },
    ],
  },
];
