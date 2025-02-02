USE [master]
GO
/****** Object:  Database [hotelBooking]    Script Date: 19/11/2024 10:48:36 ******/
CREATE DATABASE [hotelBooking]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'hotelBooking', FILENAME = N'D:\Programe Files\MSSQL16.SQLEXPRESS\MSSQL\DATA\hotelBooking.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'hotelBooking_log', FILENAME = N'D:\Programe Files\MSSQL16.SQLEXPRESS\MSSQL\DATA\hotelBooking_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [hotelBooking] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [hotelBooking].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [hotelBooking] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [hotelBooking] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [hotelBooking] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [hotelBooking] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [hotelBooking] SET ARITHABORT OFF 
GO
ALTER DATABASE [hotelBooking] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [hotelBooking] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [hotelBooking] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [hotelBooking] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [hotelBooking] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [hotelBooking] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [hotelBooking] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [hotelBooking] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [hotelBooking] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [hotelBooking] SET  ENABLE_BROKER 
GO
ALTER DATABASE [hotelBooking] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [hotelBooking] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [hotelBooking] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [hotelBooking] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [hotelBooking] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [hotelBooking] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [hotelBooking] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [hotelBooking] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [hotelBooking] SET  MULTI_USER 
GO
ALTER DATABASE [hotelBooking] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [hotelBooking] SET DB_CHAINING OFF 
GO
ALTER DATABASE [hotelBooking] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [hotelBooking] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [hotelBooking] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [hotelBooking] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [hotelBooking] SET QUERY_STORE = ON
GO
ALTER DATABASE [hotelBooking] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [hotelBooking]
GO
/****** Object:  Table [dbo].[amenities]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[amenities](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[booking_service]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[booking_service](
	[booking_id] [varchar](255) NOT NULL,
	[service_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[booking_id] ASC,
	[service_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[bookings]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bookings](
	[id] [varchar](255) NOT NULL,
	[user_id] [int] NOT NULL,
	[room_id] [int] NOT NULL,
	[check_in] [date] NOT NULL,
	[check_out] [date] NOT NULL,
	[total_amount] [decimal](10, 2) NULL,
	[amount_paid] [decimal](10, 2) NULL,
	[guest_count] [int] NOT NULL,
	[status] [varchar](10) NOT NULL,
	[created_at] [datetime] NULL,
	[customer_id] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customers]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customers](
	[id] [varchar](255) NOT NULL,
	[user_id] [int] NOT NULL,
	[fullName] [nvarchar](255) NOT NULL,
	[sex] [varchar](255) NULL,
	[phoneNumber] [varchar](10) NULL,
	[idCard] [varchar](20) NULL,
	[is_primary] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[employees]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employees](
	[id] [varchar](255) NOT NULL,
	[user_id] [int] NOT NULL,
	[fullName] [nvarchar](255) NOT NULL,
	[rights] [varchar](25) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[loyaltyLevel]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[loyaltyLevel](
	[id] [int] NOT NULL,
	[level_name] [nvarchar](50) NOT NULL,
	[discount_percentage] [decimal](5, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[payments]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[payments](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[booking_id] [varchar](255) NOT NULL,
	[payment_method] [varchar](20) NOT NULL,
	[payment_date] [datetime] NULL,
	[amount_paid] [decimal](10, 2) NOT NULL,
	[form] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[report]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[report](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[employee_id] [varchar](255) NOT NULL,
	[report_date] [datetime] NULL,
	[total_revenue] [decimal](10, 2) NULL,
	[rooms_booked] [int] NULL,
	[rooms_available] [int] NULL,
	[rooms_cancelled] [int] NULL,
	[total_rooms] [int] NULL,
	[status] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[room_amenities]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[room_amenities](
	[room_id] [int] NOT NULL,
	[amenity_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[room_id] ASC,
	[amenity_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rooms]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rooms](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[type_room_id] [int] NULL,
	[name] [varchar](10) NOT NULL,
	[capacity] [int] NULL,
	[acreage] [int] NULL,
	[amount_bed] [int] NULL,
	[price] [int] NOT NULL,
	[image] [varchar](255) NOT NULL,
	[status] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[services]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[services](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[price] [int] NOT NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[type_room]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[type_room](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 19/11/2024 10:48:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[role] [varchar](25) NULL,
	[loyalty_level_id] [int] NULL,
	[counter] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[amenities] ON 

INSERT [dbo].[amenities] ([id], [name]) VALUES (1, N'Free Wi-Fi')
INSERT [dbo].[amenities] ([id], [name]) VALUES (2, N'TV')
INSERT [dbo].[amenities] ([id], [name]) VALUES (3, N'Air Conditioning')
INSERT [dbo].[amenities] ([id], [name]) VALUES (4, N'Swimming Pool')
INSERT [dbo].[amenities] ([id], [name]) VALUES (5, N'Mini safe')
INSERT [dbo].[amenities] ([id], [name]) VALUES (6, N'Bathroom accessories')
SET IDENTITY_INSERT [dbo].[amenities] OFF
GO
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B951', 3)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B952', 2)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B953', 2)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B954', 2)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B955', 2)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B956', 1)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B957', 3)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B958', 3)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B959', 2)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B960', 2)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B961', 2)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B962', 2)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B963', 3)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B964', 1)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B965', 1)
INSERT [dbo].[booking_service] ([booking_id], [service_id]) VALUES (N'B966', 3)
GO
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B0920', 3, 3, CAST(N'2024-11-01' AS Date), CAST(N'2024-11-04' AS Date), CAST(1500.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 3, N'cancelled', CAST(N'2024-10-31T11:20:09.870' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B921', 6, 1, CAST(N'2024-11-15' AS Date), CAST(N'2024-11-21' AS Date), CAST(600.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-01T22:05:29.770' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B922', 6, 3, CAST(N'2024-11-15' AS Date), CAST(N'2024-11-25' AS Date), CAST(5000.00 AS Decimal(10, 2)), CAST(500.00 AS Decimal(10, 2)), 4, N'cancelled', CAST(N'2024-11-01T22:07:46.037' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B923', 6, 1, CAST(N'2024-11-07' AS Date), CAST(N'2024-11-08' AS Date), CAST(100.00 AS Decimal(10, 2)), CAST(100.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-01T22:18:21.793' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B924', 6, 2, CAST(N'2024-11-14' AS Date), CAST(N'2024-11-17' AS Date), CAST(600.00 AS Decimal(10, 2)), CAST(200.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-01T22:26:10.277' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B925', 6, 3, CAST(N'2024-11-02' AS Date), CAST(N'2024-11-04' AS Date), CAST(1000.00 AS Decimal(10, 2)), CAST(500.00 AS Decimal(10, 2)), 3, N'cancelled', CAST(N'2024-11-01T23:05:05.347' AS DateTime), N'Cust12')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B926', 6, 1, CAST(N'2024-11-06' AS Date), CAST(N'2024-11-16' AS Date), CAST(1000.00 AS Decimal(10, 2)), CAST(100.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-01T23:08:09.547' AS DateTime), N'Cust13')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B927', 6, 2, CAST(N'2024-11-13' AS Date), CAST(N'2024-11-25' AS Date), CAST(2400.00 AS Decimal(10, 2)), CAST(200.00 AS Decimal(10, 2)), 2, N'cancelled', CAST(N'2024-11-01T23:10:14.610' AS DateTime), N'Cust14')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B928', 6, 1, CAST(N'2024-11-22' AS Date), CAST(N'2024-12-04' AS Date), CAST(1200.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-01T23:17:19.480' AS DateTime), N'Cust15')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B929', 6, 2, CAST(N'2024-11-15' AS Date), CAST(N'2024-11-18' AS Date), CAST(600.00 AS Decimal(10, 2)), CAST(600.00 AS Decimal(10, 2)), 1, N'completed', CAST(N'2024-11-01T23:30:54.927' AS DateTime), N'Cust16')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B930', 6, 3, CAST(N'2024-11-09' AS Date), CAST(N'2024-11-12' AS Date), CAST(1500.00 AS Decimal(10, 2)), CAST(1500.00 AS Decimal(10, 2)), 1, N'completed', CAST(N'2024-11-01T23:31:19.240' AS DateTime), N'Cust17')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B931', 6, 1, CAST(N'2024-11-06' AS Date), CAST(N'2024-11-09' AS Date), CAST(300.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-01T23:45:55.513' AS DateTime), N'Cust18')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B932', 6, 1, CAST(N'2024-11-08' AS Date), CAST(N'2024-11-10' AS Date), CAST(200.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-01T23:48:58.167' AS DateTime), N'Cust19')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B933', 9, 1, CAST(N'2024-11-18' AS Date), CAST(N'2024-11-25' AS Date), CAST(700.00 AS Decimal(10, 2)), CAST(100.00 AS Decimal(10, 2)), 1, N'completed', CAST(N'2024-11-02T00:06:32.560' AS DateTime), N'Cust20')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B934', 9, 3, CAST(N'2024-11-21' AS Date), CAST(N'2024-11-26' AS Date), CAST(2500.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 2, N'cancelled', CAST(N'2024-11-02T00:34:22.007' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B935', 9, 1, CAST(N'2024-11-14' AS Date), CAST(N'2024-11-22' AS Date), CAST(800.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-02T02:11:57.540' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B936', 9, 1, CAST(N'2024-11-15' AS Date), CAST(N'2024-11-19' AS Date), CAST(400.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-02T02:14:38.327' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B937', 9, 1, CAST(N'2024-11-15' AS Date), CAST(N'2024-11-26' AS Date), CAST(1100.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-02T02:17:19.020' AS DateTime), N'Cust20')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B938', 9, 2, CAST(N'2024-11-29' AS Date), CAST(N'2024-12-06' AS Date), CAST(1400.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 2, N'cancelled', CAST(N'2024-11-02T02:17:53.490' AS DateTime), N'Cust21')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B939', 9, 1, CAST(N'2024-11-03' AS Date), CAST(N'2024-11-07' AS Date), CAST(400.00 AS Decimal(10, 2)), CAST(400.00 AS Decimal(10, 2)), 1, N'completed', CAST(N'2024-11-02T11:00:46.880' AS DateTime), N'Cust20')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B940', 9, 2, CAST(N'2024-11-03' AS Date), CAST(N'2024-11-05' AS Date), CAST(400.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 2, N'cancelled', CAST(N'2024-11-02T11:26:26.300' AS DateTime), N'Cust20')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B941', 9, 1, CAST(N'2024-11-03' AS Date), CAST(N'2024-11-05' AS Date), CAST(200.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-02T23:03:04.663' AS DateTime), N'Cust20')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B942', 7, 2, CAST(N'2024-11-28' AS Date), CAST(N'2024-12-03' AS Date), CAST(1000.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-03T15:36:31.430' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B943', 9, 3, CAST(N'2024-11-28' AS Date), CAST(N'2024-12-02' AS Date), CAST(2000.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 3, N'cancelled', CAST(N'2024-11-03T15:38:01.817' AS DateTime), N'Cust20')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B944', 9, 3, CAST(N'2024-11-07' AS Date), CAST(N'2024-11-14' AS Date), CAST(3500.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-03T16:11:06.740' AS DateTime), N'Cust20')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B945', 9, 1, CAST(N'2024-11-03' AS Date), CAST(N'2024-11-07' AS Date), CAST(400.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-03T16:36:07.293' AS DateTime), N'Cust20')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B946', 7, 3, CAST(N'2024-12-04' AS Date), CAST(N'2024-12-07' AS Date), CAST(1500.00 AS Decimal(10, 2)), CAST(500.00 AS Decimal(10, 2)), 3, N'completed', CAST(N'2024-11-08T19:09:30.450' AS DateTime), N'Cust22')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B947', 7, 3, CAST(N'2024-12-07' AS Date), CAST(N'2024-12-08' AS Date), CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 3, N'cancelled', CAST(N'2024-11-08T23:25:27.390' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B948', 7, 3, CAST(N'2025-01-11' AS Date), CAST(N'2025-01-12' AS Date), CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 3, N'cancelled', CAST(N'2024-11-08T23:26:40.167' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B949', 7, 3, CAST(N'2024-12-03' AS Date), CAST(N'2024-12-04' AS Date), CAST(570.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-09T00:00:58.860' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B950', 7, 3, CAST(N'2024-12-31' AS Date), CAST(N'2025-01-01' AS Date), CAST(570.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-09T00:01:32.543' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B951', 7, 3, CAST(N'2024-12-18' AS Date), CAST(N'2024-12-19' AS Date), CAST(570.00 AS Decimal(10, 2)), CAST(500.00 AS Decimal(10, 2)), 1, N'completed', CAST(N'2024-11-09T00:08:19.590' AS DateTime), N'Cust23')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B952', 7, 2, CAST(N'2025-01-10' AS Date), CAST(N'2025-01-11' AS Date), CAST(300.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-09T00:27:01.127' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B953', 7, 1, CAST(N'2025-01-14' AS Date), CAST(N'2025-01-15' AS Date), CAST(200.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-09T00:37:17.333' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B954', 7, 2, CAST(N'2025-02-13' AS Date), CAST(N'2025-02-14' AS Date), CAST(300.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 2, N'cancelled', CAST(N'2024-11-09T00:43:04.573' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B955', 7, 3, CAST(N'2025-03-08' AS Date), CAST(N'2025-03-09' AS Date), CAST(600.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 3, N'cancelled', CAST(N'2024-11-09T00:46:54.540' AS DateTime), N'Cust24')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B956', 7, 3, CAST(N'2025-04-09' AS Date), CAST(N'2025-04-10' AS Date), CAST(550.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 1, N'cancelled', CAST(N'2024-11-09T00:48:26.063' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B957', 7, 2, CAST(N'2024-12-18' AS Date), CAST(N'2024-12-19' AS Date), CAST(270.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 2, N'cancelled', CAST(N'2024-11-13T13:59:23.210' AS DateTime), N'Cust25')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B958', 7, 2, CAST(N'2024-12-21' AS Date), CAST(N'2024-12-22' AS Date), CAST(270.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 2, N'cancelled', CAST(N'2024-11-13T14:02:54.590' AS DateTime), N'Cust24')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B959', 7, 2, CAST(N'2024-12-18' AS Date), CAST(N'2024-12-19' AS Date), CAST(300.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 2, N'cancelled', CAST(N'2024-11-13T14:06:41.877' AS DateTime), N'Cust24')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B960', 7, 3, CAST(N'2024-11-14' AS Date), CAST(N'2024-11-15' AS Date), CAST(600.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 2, N'cancelled', CAST(N'2024-11-13T16:48:23.957' AS DateTime), N'Cust26')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B961', 7, 3, CAST(N'2024-11-16' AS Date), CAST(N'2024-11-17' AS Date), CAST(600.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 3, N'cancelled', CAST(N'2024-11-13T16:53:40.433' AS DateTime), N'Cust24')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B962', 10, 2, CAST(N'2024-11-30' AS Date), CAST(N'2024-12-01' AS Date), CAST(300.00 AS Decimal(10, 2)), CAST(200.00 AS Decimal(10, 2)), 2, N'completed', CAST(N'2024-11-13T17:15:02.713' AS DateTime), N'Cust27')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B963', 10, 3, CAST(N'2024-12-03' AS Date), CAST(N'2024-12-04' AS Date), CAST(570.00 AS Decimal(10, 2)), CAST(500.00 AS Decimal(10, 2)), 1, N'completed', CAST(N'2024-11-13T17:17:44.073' AS DateTime), N'Cust28')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B964', 10, 3, CAST(N'2024-12-07' AS Date), CAST(N'2024-12-08' AS Date), CAST(550.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 3, N'cancelled', CAST(N'2024-11-14T11:27:39.667' AS DateTime), N'Cust29')
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B965', 10, 2, CAST(N'2024-11-21' AS Date), CAST(N'2024-11-24' AS Date), CAST(650.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), 2, N'cancelled', CAST(N'2024-11-14T11:35:39.297' AS DateTime), NULL)
INSERT [dbo].[bookings] ([id], [user_id], [room_id], [check_in], [check_out], [total_amount], [amount_paid], [guest_count], [status], [created_at], [customer_id]) VALUES (N'B966', 14, 3, CAST(N'2025-01-21' AS Date), CAST(N'2025-01-22' AS Date), CAST(570.00 AS Decimal(10, 2)), CAST(500.00 AS Decimal(10, 2)), 2, N'completed', CAST(N'2024-11-14T11:49:20.820' AS DateTime), N'Cust30')
GO
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust01', 2, N'Anh Pham', N'Male', N'0853412203', N'036203003034', NULL)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust08', 3, N'Anh', N'Female', N'0853412203', N'036203003022', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust09', 3, N'The', N'Male', N'0853412258', N'036203003066', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust10', 6, N'Si', N'Female', N'4567891230', N'123654789001', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust12', 6, N'Apt', N'Male', N'4567891230', N'123654789002', 1)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust13', 6, N'Aptcd', N'Male', N'4567891230', N'123654789003', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust14', 6, N'abcd', N'Female', N'4567891230', N'123654789005', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust15', 6, N'abcd', N'Male', N'4567891230', N'123654789005', 1)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust16', 6, N'abcd', N'Male', N'4567891230', N'123654789005', 1)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust17', 6, N'Anh Pham', N'Male', N'0853412203', N'1236977952', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust18', 6, N'abcd', N'Male', N'4567891230', N'123654789005', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust19', 6, N'abcd', N'Male', N'4567891230', N'123654789005', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust20', 9, N'Tuyết Nhi', N'Female', N'0853413357', N'789456123045', 1)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust21', 9, N'anhpham', N'Female', N'123', N'456789', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust22', 7, N'Thế Anh', N'Female', N'0324578169', N'036030003245', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust23', 7, N'Trường', N'Male', N'0987465123', N'03203303456', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust24', 7, N'Minh', N'Male', N'0987465123', N'03203303458', 1)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust25', 7, N'Minh', N'Male', N'0987465123', N'03203303458', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust26', 7, N'Minh', N'Male', N'0987465123', N'03203303458', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust27', 10, N'Pham Anh', N'Male', N'0341124111', N'05234441124', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust28', 10, N'Thu HIen', N'Female', N'0341124111', N'05234441127', 0)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust29', 10, N'Anh Pham', N'Male', N'0853412203', N'12547896544', 1)
INSERT [dbo].[customers] ([id], [user_id], [fullName], [sex], [phoneNumber], [idCard], [is_primary]) VALUES (N'Cust30', 14, N'Tuyết Nhi', N'Female', N'4567891330', N'4765547891334', 1)
GO
INSERT [dbo].[loyaltyLevel] ([id], [level_name], [discount_percentage]) VALUES (1, N'Normal', CAST(0.00 AS Decimal(5, 2)))
INSERT [dbo].[loyaltyLevel] ([id], [level_name], [discount_percentage]) VALUES (2, N'Silver', CAST(15.00 AS Decimal(5, 2)))
INSERT [dbo].[loyaltyLevel] ([id], [level_name], [discount_percentage]) VALUES (3, N'Gold', CAST(30.00 AS Decimal(5, 2)))
GO
SET IDENTITY_INSERT [dbo].[payments] ON 

INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (1, N'B922', N'paypal', CAST(N'2024-11-01T22:12:34.127' AS DateTime), CAST(500.00 AS Decimal(10, 2)), N'1_night')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (2, N'B923', N'paypal', CAST(N'2024-11-01T22:21:43.523' AS DateTime), CAST(100.00 AS Decimal(10, 2)), N'payfull')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (3, N'B924', N'paypal', CAST(N'2024-11-01T22:26:40.780' AS DateTime), CAST(200.00 AS Decimal(10, 2)), N'1_night')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (4, N'B925', N'paypal', CAST(N'2024-11-01T23:05:22.273' AS DateTime), CAST(500.00 AS Decimal(10, 2)), N'1_night')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (5, N'B926', N'paypal', CAST(N'2024-11-01T23:08:52.837' AS DateTime), CAST(100.00 AS Decimal(10, 2)), N'1_night')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (6, N'B927', N'paypal', CAST(N'2024-11-01T23:10:28.520' AS DateTime), CAST(200.00 AS Decimal(10, 2)), N'1_night')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (7, N'B929', N'paypal', CAST(N'2024-11-01T23:31:08.793' AS DateTime), CAST(600.00 AS Decimal(10, 2)), N'payfull')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (8, N'B930', N'paypal', CAST(N'2024-11-01T23:31:31.377' AS DateTime), CAST(1500.00 AS Decimal(10, 2)), N'payfull')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (9, N'B933', N'paypal', CAST(N'2024-11-02T00:08:13.787' AS DateTime), CAST(100.00 AS Decimal(10, 2)), N'1_night')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (10, N'B939', N'paypal', CAST(N'2024-11-02T11:06:45.823' AS DateTime), CAST(400.00 AS Decimal(10, 2)), N'payfull')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (11, N'B946', N'paypal', CAST(N'2024-11-08T19:10:27.670' AS DateTime), CAST(500.00 AS Decimal(10, 2)), N'1_night')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (12, N'B951', N'paypal', CAST(N'2024-11-09T00:10:22.930' AS DateTime), CAST(500.00 AS Decimal(10, 2)), N'1_night')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (13, N'B962', N'paypal', CAST(N'2024-11-13T17:15:54.857' AS DateTime), CAST(200.00 AS Decimal(10, 2)), N'1_night')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (14, N'B963', N'paypal', CAST(N'2024-11-13T17:18:05.800' AS DateTime), CAST(500.00 AS Decimal(10, 2)), N'1_night')
INSERT [dbo].[payments] ([id], [booking_id], [payment_method], [payment_date], [amount_paid], [form]) VALUES (15, N'B966', N'paypal', CAST(N'2024-11-14T11:49:45.920' AS DateTime), CAST(500.00 AS Decimal(10, 2)), N'1_night')
SET IDENTITY_INSERT [dbo].[payments] OFF
GO
INSERT [dbo].[room_amenities] ([room_id], [amenity_id]) VALUES (1, 1)
INSERT [dbo].[room_amenities] ([room_id], [amenity_id]) VALUES (1, 2)
INSERT [dbo].[room_amenities] ([room_id], [amenity_id]) VALUES (1, 3)
INSERT [dbo].[room_amenities] ([room_id], [amenity_id]) VALUES (2, 3)
INSERT [dbo].[room_amenities] ([room_id], [amenity_id]) VALUES (2, 4)
INSERT [dbo].[room_amenities] ([room_id], [amenity_id]) VALUES (2, 5)
INSERT [dbo].[room_amenities] ([room_id], [amenity_id]) VALUES (3, 1)
INSERT [dbo].[room_amenities] ([room_id], [amenity_id]) VALUES (3, 4)
GO
SET IDENTITY_INSERT [dbo].[rooms] ON 

INSERT [dbo].[rooms] ([id], [type_room_id], [name], [capacity], [acreage], [amount_bed], [price], [image], [status]) VALUES (1, 1, N'R001', 1, 40, 1, 100, N'https://res.cloudinary.com/doruhcyf6/image/upload/v1726802640/82818747-2565205560416758-2610-7525-4364-1655448392_ho0zfg.jpg', N'booked')
INSERT [dbo].[rooms] ([id], [type_room_id], [name], [capacity], [acreage], [amount_bed], [price], [image], [status]) VALUES (2, 2, N'R002', 2, 50, 1, 200, N'https://res.cloudinary.com/doruhcyf6/image/upload/v1726802640/salah-hotel-3343-1593059854-30-6463-7732-1655448393_rh4hog.jpg', N'booked')
INSERT [dbo].[rooms] ([id], [type_room_id], [name], [capacity], [acreage], [amount_bed], [price], [image], [status]) VALUES (3, 3, N'R003', 4, 50, 1, 500, N'https://res.cloudinary.com/doruhcyf6/image/upload/v1726802637/homestay-quy-nhon-4588-1592910-1801-3454-1655448395_nos8q5.jpg', N'booked')
SET IDENTITY_INSERT [dbo].[rooms] OFF
GO
SET IDENTITY_INSERT [dbo].[services] ON 

INSERT [dbo].[services] ([id], [name], [price], [description]) VALUES (1, N'Room Cleaning', 50, N'Daily room cleaning service.')
INSERT [dbo].[services] ([id], [name], [price], [description]) VALUES (2, N'Spa', 100, N'Relaxing spa treatment.')
INSERT [dbo].[services] ([id], [name], [price], [description]) VALUES (3, N'Airport Pickup', 70, N'Pickup from airport.')
SET IDENTITY_INSERT [dbo].[services] OFF
GO
SET IDENTITY_INSERT [dbo].[type_room] ON 

INSERT [dbo].[type_room] ([id], [name], [description]) VALUES (1, N'Single Room', N'A small room for one person.')
INSERT [dbo].[type_room] ([id], [name], [description]) VALUES (2, N'Double Room', N'A room for two people.')
INSERT [dbo].[type_room] ([id], [name], [description]) VALUES (3, N'Suite', N'A luxurious room with extra amenities.')
SET IDENTITY_INSERT [dbo].[type_room] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (1, N'anh@gmail.com', N'$2b$10$5aWcQc8h6ReeRat5WlMIG.IRnJGBNcySTOU50X3Ua3OVbo3j9qenC', N'customer', NULL, NULL)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (2, N'pt@gmail.com', N'$2b$10$SIi9tgimekKuEjHlFlgyJOjIYoDems6CYVeDUMPhuw09NKHbvGJXG', N'customer', NULL, NULL)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (3, N'the@gmail.com', N'$2b$10$JS8ywwmKB.VStpkq8tekLeL1PothT.kLcgA.gJ7zLhGbQjoj26JJG', N'admin', 2, 6)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (4, N'ádfsdfsd', N'$2b$10$/EeNy0JaMeW14RAeCQUmOuxwQSRtYLToBFt4/4Rwhjvjhq/j4BrLi', N'customer', 1, 0)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (5, N'xcvxcv', N'$2b$10$61eUIY7YkbSapXWNAdiQx.jsKl1BFNyfEOaewSMo1SZ82pUUM.lMK', N'customer', 1, 0)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (6, N'1050080043@sv.hcmunre.edu.vn', N'$2b$10$VvBnfo7ZmGK71FWILzMDb.I6mVcx2dQjfWbDJmFHLCn1ZIH0ejtaW', N'customer', 3, 12)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (7, N'pham@gmail.com', N'$2b$10$8x0khF5UwaXGhqQ72GN/v.oZ1jfotZClo/nXddDlmHZqs3eSQ8e.i', N'admin', 3, 17)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (9, N'theanh@gmail.com', N'$2b$10$pvuphvIEDUgFPAD00ldGH.y8wRYx2h4B6vOqOhr/3tyTJXAxcP2ri', N'customer', 3, 12)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (10, N'pham041203theanh@gmail.com', N'$2b$10$jjscctC/Nar8hLqzznK83eGVV1D46bmIPpErGjp/loga0TeHaxpWq', N'customer', 1, 4)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (11, N'apt@gmail.com', N'$2b$10$yEmnebF5HyC/QC7c5XaHvuOu/yVt2maGnf3cSaYYJ3y6VDMbvARTC', N'admin', 1, 0)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (12, N'apt123@gmail.com', N'$2b$10$eUxJRR/ifFv11oUCdC3LouzAumlXRCnMHKVfLaH0zPgGHUzsA.hL.', N'customer', 1, 0)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (13, N'apt1234@gmail.com', N'$2b$10$.ZN3kuZAoKLbmC0ijB3dFObDVtOAvkX7O3pwmTMzBjPAVXPOWQVha', N'customer', 1, 0)
INSERT [dbo].[users] ([id], [email], [password], [role], [loyalty_level_id], [counter]) VALUES (14, N'nhi.dnht@gmail.com', N'$2b$10$vPL5o7Uc/3aivBjC25Ab3OAwPVD4YjDmu/mWIVHEQFnXVAwSE1HZK', N'customer', 1, 1)
SET IDENTITY_INSERT [dbo].[users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__loyaltyL__F94299E9CA89BF4A]    Script Date: 19/11/2024 10:48:38 ******/
ALTER TABLE [dbo].[loyaltyLevel] ADD UNIQUE NONCLUSTERED 
(
	[level_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__users__AB6E61643DCC4690]    Script Date: 19/11/2024 10:48:38 ******/
ALTER TABLE [dbo].[users] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[bookings] ADD  DEFAULT ((0)) FOR [amount_paid]
GO
ALTER TABLE [dbo].[bookings] ADD  DEFAULT ('pending') FOR [status]
GO
ALTER TABLE [dbo].[bookings] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[customers] ADD  DEFAULT ((1)) FOR [is_primary]
GO
ALTER TABLE [dbo].[employees] ADD  DEFAULT ('staff') FOR [rights]
GO
ALTER TABLE [dbo].[loyaltyLevel] ADD  DEFAULT ('Normal') FOR [level_name]
GO
ALTER TABLE [dbo].[payments] ADD  DEFAULT (getdate()) FOR [payment_date]
GO
ALTER TABLE [dbo].[payments] ADD  DEFAULT ((0)) FOR [amount_paid]
GO
ALTER TABLE [dbo].[report] ADD  DEFAULT (getdate()) FOR [report_date]
GO
ALTER TABLE [dbo].[report] ADD  DEFAULT ('pending') FOR [status]
GO
ALTER TABLE [dbo].[rooms] ADD  DEFAULT ('available') FOR [status]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ('customer') FOR [role]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((1)) FOR [loyalty_level_id]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((0)) FOR [counter]
GO
ALTER TABLE [dbo].[booking_service]  WITH CHECK ADD FOREIGN KEY([booking_id])
REFERENCES [dbo].[bookings] ([id])
GO
ALTER TABLE [dbo].[booking_service]  WITH CHECK ADD FOREIGN KEY([service_id])
REFERENCES [dbo].[services] ([id])
GO
ALTER TABLE [dbo].[bookings]  WITH CHECK ADD FOREIGN KEY([customer_id])
REFERENCES [dbo].[customers] ([id])
GO
ALTER TABLE [dbo].[bookings]  WITH CHECK ADD  CONSTRAINT [fk_room_id] FOREIGN KEY([room_id])
REFERENCES [dbo].[rooms] ([id])
GO
ALTER TABLE [dbo].[bookings] CHECK CONSTRAINT [fk_room_id]
GO
ALTER TABLE [dbo].[bookings]  WITH CHECK ADD  CONSTRAINT [fk_user_id] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[bookings] CHECK CONSTRAINT [fk_user_id]
GO
ALTER TABLE [dbo].[customers]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[employees]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[payments]  WITH CHECK ADD  CONSTRAINT [fk_booking] FOREIGN KEY([booking_id])
REFERENCES [dbo].[bookings] ([id])
GO
ALTER TABLE [dbo].[payments] CHECK CONSTRAINT [fk_booking]
GO
ALTER TABLE [dbo].[report]  WITH CHECK ADD  CONSTRAINT [fk_employee_id] FOREIGN KEY([employee_id])
REFERENCES [dbo].[employees] ([id])
GO
ALTER TABLE [dbo].[report] CHECK CONSTRAINT [fk_employee_id]
GO
ALTER TABLE [dbo].[room_amenities]  WITH CHECK ADD FOREIGN KEY([amenity_id])
REFERENCES [dbo].[amenities] ([id])
GO
ALTER TABLE [dbo].[room_amenities]  WITH CHECK ADD FOREIGN KEY([room_id])
REFERENCES [dbo].[rooms] ([id])
GO
ALTER TABLE [dbo].[rooms]  WITH CHECK ADD  CONSTRAINT [fk_typeRoom_id] FOREIGN KEY([type_room_id])
REFERENCES [dbo].[type_room] ([id])
GO
ALTER TABLE [dbo].[rooms] CHECK CONSTRAINT [fk_typeRoom_id]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD FOREIGN KEY([loyalty_level_id])
REFERENCES [dbo].[loyaltyLevel] ([id])
GO
ALTER TABLE [dbo].[bookings]  WITH CHECK ADD  CONSTRAINT [chk_booking_status] CHECK  (([status]='cancelled' OR [status]='completed' OR [status]='pending'))
GO
ALTER TABLE [dbo].[bookings] CHECK CONSTRAINT [chk_booking_status]
GO
ALTER TABLE [dbo].[bookings]  WITH CHECK ADD  CONSTRAINT [chk_dates] CHECK  (([check_out]>[check_in]))
GO
ALTER TABLE [dbo].[bookings] CHECK CONSTRAINT [chk_dates]
GO
ALTER TABLE [dbo].[bookings]  WITH CHECK ADD  CONSTRAINT [chk_guest_count] CHECK  (([guest_count]>=(1) AND [guest_count]<=(10)))
GO
ALTER TABLE [dbo].[bookings] CHECK CONSTRAINT [chk_guest_count]
GO
ALTER TABLE [dbo].[customers]  WITH CHECK ADD  CONSTRAINT [chk_sex] CHECK  (([sex]='female' OR [sex]='male'))
GO
ALTER TABLE [dbo].[customers] CHECK CONSTRAINT [chk_sex]
GO
ALTER TABLE [dbo].[employees]  WITH CHECK ADD  CONSTRAINT [chk_rights] CHECK  (([rights]='staff' OR [rights]='admin'))
GO
ALTER TABLE [dbo].[employees] CHECK CONSTRAINT [chk_rights]
GO
ALTER TABLE [dbo].[payments]  WITH CHECK ADD  CONSTRAINT [chk_payment_method] CHECK  (([payment_method]='paypal' OR [payment_method]='credit_card'))
GO
ALTER TABLE [dbo].[payments] CHECK CONSTRAINT [chk_payment_method]
GO
ALTER TABLE [dbo].[payments]  WITH CHECK ADD  CONSTRAINT [chk_payment_status] CHECK  (([form]='payfull' OR [form]='1_night'))
GO
ALTER TABLE [dbo].[payments] CHECK CONSTRAINT [chk_payment_status]
GO
ALTER TABLE [dbo].[report]  WITH CHECK ADD  CONSTRAINT [chk_payment] CHECK  (([status]='completed' OR [status]='pending'))
GO
ALTER TABLE [dbo].[report] CHECK CONSTRAINT [chk_payment]
GO
ALTER TABLE [dbo].[rooms]  WITH CHECK ADD  CONSTRAINT [chk_room_capacity] CHECK  (([capacity]>=(1) AND [capacity]<=(10)))
GO
ALTER TABLE [dbo].[rooms] CHECK CONSTRAINT [chk_room_capacity]
GO
ALTER TABLE [dbo].[rooms]  WITH CHECK ADD  CONSTRAINT [chk_room_status] CHECK  (([status]='booked' OR [status]='available'))
GO
ALTER TABLE [dbo].[rooms] CHECK CONSTRAINT [chk_room_status]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [chk_role] CHECK  (([role]='staff' OR [role]='admin' OR [role]='customer'))
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [chk_role]
GO
/****** Object:  StoredProcedure [dbo].[sp_calculate_total_amount]    Script Date: 19/11/2024 10:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_calculate_total_amount]
    @check_in DATE,
    @check_out DATE,
    @room_id INT,
    @user_id INT,
    @selected_services NVARCHAR(MAX) = NULL
AS
BEGIN
    DECLARE @total_days INT;
    DECLARE @room_price INT;
    DECLARE @total_room_amount DECIMAL(10, 2);
    DECLARE @total_service_amount DECIMAL(10, 2);
    DECLARE @discount_percentage DECIMAL(5, 2) = 0;
    DECLARE @loyalty_level_id INT;

    -- Tính số ngày lưu trú
    SET @total_days = DATEDIFF(day, @check_in, @check_out);

    -- Lấy giá phòng
    SELECT @room_price = price FROM rooms WHERE id = @room_id;

    -- Tính tổng tiền phòng
    SET @total_room_amount = @total_days * @room_price;

    -- Tính tổng tiền dịch vụ
    IF @selected_services IS NOT NULL
    BEGIN
        SELECT @total_service_amount = ISNULL(SUM(s.price), 0)
        FROM services s
        WHERE s.id IN (SELECT value FROM STRING_SPLIT(@selected_services, ','))
    END
    ELSE
    BEGIN
        SET @total_service_amount = 0;
    END

    -- Tính tổng trước chiết khấu
    DECLARE @subtotal DECIMAL(10, 2) = @total_room_amount + @total_service_amount;

    -- Áp dụng chiết khấu nếu có
    DECLARE @discount_amount DECIMAL(10, 2) = (@subtotal * @discount_percentage) / 100;

    -- Trả về tổng tiền sau chiết khấu
    SELECT @subtotal - @discount_amount AS total_amount;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_cancel_unpaid_bookings]    Script Date: 19/11/2024 10:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_cancel_unpaid_bookings]
AS
BEGIN
    -- Hủy booking quá 1 tiếng chưa thanh toán (status là 'pending')
    UPDATE bookings
    SET status = 'cancelled'
    WHERE status = 'pending'
	AND DATEDIFF(HOUR, created_at, GETDATE()) >= 1;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_CheckRoomAvailability]    Script Date: 19/11/2024 10:48:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_CheckRoomAvailability]
    @roomId INT,
    @checkIn DATETIME,
    @checkOut DATETIME
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra xem có booking nào tồn tại trong khoảng thời gian đã cho không
 IF EXISTS (
        SELECT 1
        FROM bookings
        WHERE room_id = @roomId
        AND (check_in < @checkOut AND check_out > @checkIn)
        AND status = 'completed'
    )
    BEGIN
        -- Nếu đã có booking, ném ra lỗi
        RAISERROR('Room is already booked for the selected dates.', 16, 1);
        RETURN; -- Dừng thực hiện procedure
    END
    SELECT 'Room is available for booking.' AS Message; -- Trả về thông điệp nếu phòng còn trống
END;
GO
USE [master]
GO
ALTER DATABASE [hotelBooking] SET  READ_WRITE 
GO
