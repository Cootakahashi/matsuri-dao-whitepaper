---
sidebar_position: 4
id: flywheel
title: 🔄 Bánh đà kinh tế
---

# 🔄 Bánh đà kinh tế — vòng lặp tăng trưởng và OS văn hóa

> **Du khách càng tận hưởng Nhật Bản, hệ sinh thái càng tạo ra nhiều nhu cầu.**
> Cơ chế cung-cầu này là trái tim đang đập của dự án.

---

## Cơ chế cung-cầu của MTC

Bằng thiết kế của Matsuri Protocol, **nhu cầu thực gia tăng tạo ra áp lực mua, và kết hợp với nguồn cung thu hẹp, tạo điều kiện cho giá trị tăng lên.**
Đây không phải là cảm xúc — đó là một **cơ chế cung và cầu.**

Cơ chế đó vận hành theo **vòng lặp bốn bước** dưới đây.

```mermaid
graph TD
    A["① Nhu cầu thực xuất hiện"]:::step1 -->|Du khách cần MTC| B["② Áp lực mua trên thị trường"]:::step2
    B -->|Mua trên DEX với giá thị trường| C["③ Lock & Burn"]:::step3
    C -->|Cung lưu thông giảm vật lý| D["④ Giá trị tăng"]:::step4
    D -->|Khan hiếm tăng| A

    classDef step1 fill:#1a3a2a,stroke:#4ade80,color:#bbf7d0
    classDef step2 fill:#3a2a0a,stroke:#f59e0b,color:#fef3c7
    classDef step3 fill:#3a1a1a,stroke:#f87171,color:#fecaca
    classDef step4 fill:#1a2a3a,stroke:#60a5fa,color:#bfdbfe
```

| Bước | Tên | Cơ chế |
| :---: | :--- | :--- |
| **①** | **Nhu cầu thực xuất hiện** | Du khách cần MTC để đặt hướng dẫn viên hoặc mua ticket NFT |
| **②** | **Áp lực mua trên thị trường** | MTC được mua theo giá thị trường trên DEX (sàn phi tập trung). Áp lực mua mạnh dựa trên tiêu dùng, không phải đầu cơ |
| **③** | **Lock & Burn** | Một phần MTC dùng trong thanh toán bị khóa hoặc đốt tức thì bởi smart contract. Cung lưu thông giảm vật lý |
| **④** | **Khan hiếm tăng** | Nhu cầu mua tăng, cung bán giảm. Sự dịch chuyển trong cân bằng cung-cầu khiến mỗi token khan hiếm hơn |

![Một cây cầu của 和 vắt qua bầu trời đêm — một vũ trụ nơi cung và cầu khép vòng bằng toán học](/brand/04_B_night.webp)

---

---

:::note Tầm nhìn đằng sau phương trình này
Bức tranh lớn hơn — "OS văn hóa" nằm bên kia bánh đà — được khám phá chi tiết ở trang tiếp theo, [Tương lai mà MTC hình dung](/docs/future).
:::

---

**[◀ Trước: Thách thức & Giải pháp](/docs/challenges)** | **[▶ Tiếp: Tương lai mà MTC hình dung](/docs/future)**
