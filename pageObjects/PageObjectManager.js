import LoginPage from './LoginPage.js';
import DashboardPage from './DashboardPage.js';
import CartPage from './CartPage.js';
import OrdersPage from './OrderPage.js';
import PaymentPage from './PaymentPage.js';

export default class PageObjectManager {
    constructor(page) {
        this.page = page;
        this.loginPage = null;
        this.dashboardPage = null;
        this.cartPage = null;
        this.ordersPage = null;
        this.paymentPage = null;
    }

    getLoginPage() {
        if (!this.loginPage) {
            this.loginPage = new LoginPage(this.page);
        }
        return this.loginPage;
    }

    getDashboardPage() {
        if (!this.dashboardPage) {
            this.dashboardPage = new DashboardPage(this.page);
        }
        return this.dashboardPage;
    }

    getCartPage() {
        if (!this.cartPage) {
            this.cartPage = new CartPage(this.page);
        }
        return this.cartPage;
    }

    getOrdersPage() {
        if (!this.ordersPage) {
            this.ordersPage = new OrdersPage(this.page);
        }
        return this.ordersPage;
    }
    getPaymentPage() {
        if (!this.paymentPage) {
            this.paymentPage = new PaymentPage(this.page);
        }
        return this.paymentPage;
    }
}
