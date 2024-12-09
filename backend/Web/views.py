from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import render, get_object_or_404
from .models import *
from .serializers import *

@api_view(['POST'])
def login(request):
    """
    Đăng nhập người dùng, trả về JWT Token nếu xác thực thành công.
    """
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        # Xác thực người dùng
        try:
            user = User.objects.get(email=email)
            if user.check_password(password) and user.role == 'customer':
                # Tạo token nếu mật khẩu đúng
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'userID': user.id,
                    'email': user.email,
                    'username': user.username,
                    'role': user.role,
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Mật khẩu không chính xác.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'Người dùng không tồn tại.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register(request):
    """
    Đăng ký tài khoản cho khách hàng.
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Đăng ký thành công!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Danh sách sản phẩm
@api_view(['GET'])
def get_products(request):
    try: 
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error': 'Không tìm thấy sản phẩm.'}, status=status.HTTP_404_NOT_FOUND)

# Chi tiet san pham
@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk = pk)
        serializers = ProductSerializer(product)
        return Response(serializers.data)
    except Product.DoesNotExist:
        return Response({'error': 'Sản phẩm không tồn tại'}, status=404)

# Tạo mới sản phẩm
@api_view(['POST'])
def create_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Sửa sản phẩm
@api_view(['PUT'])
def update_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error': 'Sản phẩm không tồn tại.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProductSerializer(product, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Xóa sản phẩm
@api_view(['DELETE'])
def delete_product(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        product.delete()
        return Response({'message': 'Sản phẩm đã được xóa thành công.'}, status=status.HTTP_204_NO_CONTENT)
    except Product.DoesNotExist:
        return Response({'error': 'Sản phẩm không tồn tại.'}, status=status.HTTP_404_NOT_FOUND)

# Danh sách Category
@api_view(['GET'])
def get_categories(request):
    try: 
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    except Category.DoesNotExist:
        return Response({'error': 'Không tìm thấy danh mục.'}, status=status.HTTP_404_NOT_FOUND)

# Tạo mới Category
@api_view(['POST'])
def create_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Sửa Category
@api_view(['PUT'])
def update_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response({'error': 'Danh mục không tồn tại.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = CategorySerializer(category, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Xóa Category
@api_view(['DELETE'])
def delete_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
        category.delete()
        return Response({'message': 'Danh mục đã được xóa thành công.'}, status=status.HTTP_204_NO_CONTENT)
    except Category.DoesNotExist:
        return Response({'error': 'Danh mục không tồn tại.'}, status=status.HTTP_404_NOT_FOUND)
    
    
# Danh sách đơn hàng
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def customer_orders(request):
    try:
        # Lấy customer từ user đang đăng nhập
        customer = Customer.objects.get(user = request.user)
        print(customer)

        # Lấy tất cả đơn hàng thuộc về customer này
        orders = Order.objects.filter(customer=customer).order_by('-created_at')

        # Serialize dữ liệu
        serializer = OrderSerializer(orders, many=True)
        return Response({"orders": serializer.data}, status=status.HTTP_200_OK)
    except AttributeError:
        return Response(
            {"detail": "Không tìm thấy thông tin khách hàng."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    
# Danh sách đơn hàng
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def customer_orders(request):
    try:
        # Lấy customer từ user đang đăng nhập
        customer = Customer.objects.get(user = request.user)
        print(customer)

        # Lấy tất cả đơn hàng thuộc về customer này
        orders = Order.objects.filter(customer=customer).order_by('-created_at')

        # Serialize dữ liệu
        serializer = OrderSerializer(orders, many=True)
        return Response({"orders": serializer.data}, status=status.HTTP_200_OK)
    except AttributeError:
        return Response(
            {"detail": "Không tìm thấy thông tin khách hàng."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
# Tạo mới đơn hàng
# {
#   "customer": 1,
#   "payment_method": 1,
#   "discount": null,
#   "products": [
#     { "id": 1, "quantity": 2 },
#     { "id": 2, "quantity": 3 }
#   ]
# }

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    # Lấy thông tin khách hàng
    customer = Customer.objects.filter(user=request.user).first()
    if not customer:
        return Response({'error': 'Người dùng không phải là khách hàng.'}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data
    products_data = data.get('products', [])  # Danh sách sản phẩm bao gồm {id, quantity}
    payment_method_id = data.get('payment_method')
    
    # lấy mã giảm giá
    if 'discount' in data:
        discount_id = data.get('discount')
        try:
            discount = Discount.objects.get(id=discount_id)
        except Discount.DoesNotExist:
            return Response({'error': f'Mã giảm giá với ID {discount_id} không tồn tại.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        discount = None


    # Kiểm tra phương thức thanh toán
    try:
        payment = PaymentMethod.objects.get(id=payment_method_id)
    except PaymentMethod.DoesNotExist:
        return Response({'error': 'Phương thức thanh toán không hợp lệ.'}, status=status.HTTP_400_BAD_REQUEST)

    # Kiểm tra danh sách sản phẩm
    if not products_data:
        return Response({'error': 'Danh sách sản phẩm không được để trống.'}, status=status.HTTP_400_BAD_REQUEST)

    total_price = 0.0
    order_items = []

    # Duyệt qua danh sách sản phẩm để tính tổng giá và tạo danh sách tạm cho OrderItem
    for item_data in products_data:
        product_id = item_data.get('id')
        quantity = item_data.get('quantity', 1)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': f'Sản phẩm với ID {product_id} không tồn tại.'}, status=status.HTTP_400_BAD_REQUEST)

        # Tính tổng giá trị
        total_price += product.price * quantity
        
        
        # Lưu OrderItem vào danh sách tạm
        order_items.append({
            'product': product,
            'quantity': quantity,
            'total_value': product.price * quantity
        })

    # Tạo đơn hàng
    if discount != None:
        if total_price >= discount.minimum:
            total_price -= (discount.discountvalue * total_price) / 100

            order = Order.objects.create(
                customer=customer,
                tongtien=total_price,
                hovaten=data.get('hovaten', customer.user.username),
                sdt=data.get('sdt', customer.user.phone_number),
                email=data.get('email', customer.user.email),
                diachi=data.get('diachi', customer.user.address),
                status='Chờ xác nhận',
                payment_method=payment,
                discount=discount
            )
    else:
        order = Order.objects.create(
            customer=customer,
            tongtien=total_price,
            hovaten=data.get('hovaten', customer.user.username),
            sdt=data.get('sdt', customer.user.phone_number),
            email=data.get('email', customer.user.email),
            diachi=data.get('diachi', customer.user.address),
            status='Chờ xác nhận',
            payment_method=payment
        )

    # Tạo OrderItem cho từng sản phẩm và liên kết với Order
    for item in order_items:
        OrderItem.objects.create(
            order=order,
            product=item['product'],
            quantity=item['quantity'],
            total_value=item['total_value']
        )

    # Serialize dữ liệu đơn hàng
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# hủy đơn hàng

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def cancel_order(request, pk):
    try:
        order = Order.objects.get(pk=pk)
        if order.customer.user != request.user:
            return Response({'error': 'Bạn không có quyền hủy đơn hàng này.'}, status=status.HTTP_403_FORBIDDEN)
        if order.status != 'Chờ xác nhận':
            return Response({'error': 'Đơn hàng không thể hủy bây gi��.'}, status=status.HTTP_400_BAD_REQUEST)
        order.status = 'Đã hủy'
        order.save()
        return Response({'message': 'Đơn hàng đã hủy thành công.'}, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'error': 'Đơn hàng không tồn tại.'}, status=status.HTTP_404_NOT_FOUND)
    except AttributeError:
        return Response(
            {"detail": "Không tìm thấy thông tin khách hàng."},
            status=status.HTTP_400_BAD_REQUEST
        )

# get giỏ hàng
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def customer_cart(request):
    try:
        # Lấy customer từ user đang đăng nhập
        customer = Customer.objects.get(user = request.user)
        print(customer)

        # Lấy tất cả đơn hàng thuộc về customer này
        cart = Cart.objects.filter(customer=customer)

        # Serialize dữ liệu
        serializer = CartSerializer(cart, many=True)
        return Response({"carts": serializer.data}, status=status.HTTP_200_OK)
    except AttributeError:
        return Response(
            {"detail": "Không tìm thấy thông tin khách hàng."},
            status=status.HTTP_400_BAD_REQUEST
        )
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    try:
        # Lấy customer từ user đang đăng nhập
        customer = Customer.objects.get(user=request.user)
        print(customer)
        
        # Lấy hoặc tạo giỏ hàng của user
        cart, created = Cart.objects.get_or_create(customer=customer)
        
        data = request.data
        product_id = data.get('product_id')
        quantity = data.get('quantity', 1)
        
        # Kiểm tra product_id có được cung cấp hay không
        if not product_id:
            return Response({'error': 'Products ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Lấy sản phẩm dựa trên product_id
        product = get_object_or_404(Product, id=product_id)
        
        # Kiểm tra xem sản phẩm đã có trong CartItem của giỏ hàng hay chưa
        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)
        
        # Nếu item đã tồn tại, chỉ cập nhật số lượng
        if not item_created:
            cart_item.quantity += int(quantity)  # Cộng thêm số lượng mới vào số lượng hiện tại
        else:
            cart_item.quantity = int(quantity)  # Đặt số lượng theo số lượng yêu cầu
        cart_item.save()
        
        # Lưu lại giỏ hàng nếu chưa lưu
        cart.save()
        
        # Thêm sản phẩm vào danh sách products của Cart nếu chưa có
        if product not in cart.products.all():
            cart.products.add(product)
        
        # Cập nhật tổng giá trị và số lượng sản phẩm trong giỏ
        cart.total_value = sum(item.quantity * item.product.price for item in CartItem.objects.filter(cart=cart))
        cart.quantity = cart.total_product_type()
        cart.save()

        # Trả về giỏ hàng đã cập nhật
        return Response({
            'message': 'Product added to cart successfully',
            'product': {
                'name': product.name,
                'quantity': cart_item.quantity
            }
        }, status=status.HTTP_200_OK)

    except Customer.DoesNotExist:
        return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

