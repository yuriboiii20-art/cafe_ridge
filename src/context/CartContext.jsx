import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext(null);

const buildCartItem = (item, comboId = null) => {
	const cartItemId = comboId ? `${comboId}-${item.id}` : String(item.id);
	return {
		cartItemId,
		id: item.id,
		name: item.name,
		price: item.price,
		image: item.image,
		category: item.category,
		quantity: 1,
		addons: [],
		comboId: comboId || null,
	};
};

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useLocalStorage("cafenova-cart", []);
	const [discounts, setDiscounts] = useLocalStorage("cafenova-discounts", []);

	// Migrate stale localStorage data from previous architecture
	useEffect(() => {
		setCartItems((current) =>
			current
				.filter((item) => !item.isComboDiscount) // drop old fake discount items
				.map((item) => ({
					...item,
					cartItemId: item.cartItemId || String(item.id),
					comboId: item.comboId || null,
				}))
		);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	/** Add a single individual item (non-combo). */
	const addItem = (item) => {
		setCartItems((currentItems) => {
			const cartItemId = String(item.id);
			const existing = currentItems.find(
				(ci) => ci.cartItemId === cartItemId && !ci.comboId
			);
			if (existing) {
				return currentItems.map((ci) =>
					ci.cartItemId === cartItemId && !ci.comboId
						? { ...ci, quantity: ci.quantity + 1 }
						: ci
				);
			}
			return [...currentItems, buildCartItem(item)];
		});
	};

	/**
	 * Add multiple items as an atomic combo group.
	 * All items share the same comboId so they can be removed together.
	 * Discount is stored separately — NOT as a cart item.
	 */
	const addItems = (items, discount = 0, discountLabel = "Combo Discount") => {
		const comboId = `combo-${Date.now()}`;

		setCartItems((currentItems) => {
			const newItems = items.filter(Boolean).map((item) =>
				buildCartItem(item, comboId)
			);
			return [...currentItems, ...newItems];
		});

		if (discount > 0) {
			setDiscounts((current) => [
				...current,
				{ id: comboId, label: discountLabel, amount: discount },
			]);
		}
	};

	/** Decrease qty of an individual item by cartItemId; removes when qty reaches 0. */
	const removeItem = (cartItemId) => {
		setCartItems((currentItems) =>
			currentItems
				.map((ci) =>
					ci.cartItemId === cartItemId
						? { ...ci, quantity: ci.quantity - 1 }
						: ci
				)
				.filter((ci) => ci.quantity > 0)
		);
	};

	/** Remove ALL items belonging to a combo group AND its discount in one shot. */
	const removeCombo = (comboId) => {
		setCartItems((current) => current.filter((ci) => ci.comboId !== comboId));
		setDiscounts((current) => current.filter((d) => d.id !== comboId));
	};

	const updateItemQuantity = (cartItemId, quantity) => {
		setCartItems((currentItems) =>
			currentItems
				.filter((ci) => ci.cartItemId !== cartItemId || quantity > 0)
				.map((ci) =>
					ci.cartItemId === cartItemId ? { ...ci, quantity } : ci
				)
		);
	};

	const setItemAddons = (cartItemId, addons) => {
		setCartItems((currentItems) =>
			currentItems.map((ci) =>
				ci.cartItemId === cartItemId ? { ...ci, addons } : ci
			)
		);
	};

	const value = useMemo(
		() => ({
			cartItems,
			discounts,
			addItem,
			addItems,
			removeItem,
			removeCombo,
			updateItemQuantity,
			setItemAddons,
		}),
		[cartItems, discounts] // eslint-disable-line react-hooks/exhaustive-deps
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
};
