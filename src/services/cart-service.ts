import {OrderDTO, OrderItemDTO} from "../models/order.ts";
import * as cartRepository from "../localstorage/cart-repository.ts";
import {ProductDTO} from "../models/product.ts";

export function saveCart(cart: OrderDTO) {
    cartRepository.save(cart);
}

export function getCart() : OrderDTO {
    return cartRepository.get();
}

export function addProduct(product: ProductDTO) {
    // .get acessa o carrinho
    const cart = cartRepository.get();

    // procura dentro dos items do carrinho, se já existe um produto com o mesmo id
    const item = cart.items.find(x => x.productId === product.id);
    if (!item) {
        const newItem = new OrderItemDTO(product.id, 1, product.name, product.price, product.imgUrl);
        cart.items.push(newItem);
        // salva a nova versão do carrinho no localStorage
        cartRepository.save(cart);
    }
}

export function clearCart() {
    cartRepository.clear();
}

export function increaseItem(productId: number) {
    const cart = cartRepository.get();
    const item = cart.items.find(x => x.productId === productId);
    if (item) {
        item.quantity++;
        cartRepository.save(cart);
    }
}

export function decreaseItem(productId: number) {
    const cart = cartRepository.get();
    const item = cart.items.find(x => x.productId === productId);
    if (item) {
        item.quantity--;
        if (item.quantity < 1) {
            // filtra todos que tenham o id diferente
            cart.items = cart.items.filter(x => x.productId !== productId);
        }
        cartRepository.save(cart);
    }
}
