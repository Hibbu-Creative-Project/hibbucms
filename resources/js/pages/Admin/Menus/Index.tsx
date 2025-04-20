"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Plus,
  Trash,
  ChevronUp,
  ChevronDown,
  LinkIcon,
  FileText,
  Home,
  ExternalLink,
  GripVertical,
} from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
export const placeholderMenus = [
    {
      id: "main-menu",
      name: "Main Navigation",
      location: "header",
      items: [
        {
          id: "menu-item-1",
          type: "home",
          label: "Home",
          url: "/",
          children: [],
        },
        {
          id: "menu-item-2",
          type: "page",
          label: "About Us",
          url: "/about",
          children: [],
        },
        {
          id: "menu-item-3",
          type: "page",
          label: "Services",
          url: "/services",
          children: [
            {
              id: "menu-item-3-1",
              type: "page",
              label: "Web Design",
              url: "/services/web-design",
              children: [],
            },
            {
              id: "menu-item-3-2",
              type: "page",
              label: "Development",
              url: "/services/development",
              children: [],
            },
          ],
        },
        {
          id: "menu-item-4",
          type: "page",
          label: "Blog",
          url: "/blog",
          children: [],
        },
        {
          id: "menu-item-5",
          type: "page",
          label: "Contact",
          url: "/contact",
          children: [],
        },
      ],
    },
    {
      id: "footer-menu",
      name: "Footer Navigation",
      location: "footer",
      items: [
        {
          id: "menu-item-6",
          type: "page",
          label: "Privacy Policy",
          url: "/privacy",
          children: [],
        },
        {
          id: "menu-item-7",
          type: "page",
          label: "Terms of Service",
          url: "/terms",
          children: [],
        },
        {
          id: "menu-item-8",
          type: "page",
          label: "FAQ",
          url: "/faq",
          children: [],
        },
      ],
    },
    {
      id: "mobile-menu",
      name: "Mobile Navigation",
      location: "mobile",
      items: [
        {
          id: "menu-item-9",
          type: "home",
          label: "Home",
          url: "/",
          children: [],
        },
        {
          id: "menu-item-10",
          type: "page",
          label: "About",
          url: "/about",
          children: [],
        },
        {
          id: "menu-item-11",
          type: "page",
          label: "Services",
          url: "/services",
          children: [],
        },
        {
          id: "menu-item-12",
          type: "page",
          label: "Blog",
          url: "/blog",
          children: [],
        },
        {
          id: "menu-item-13",
          type: "page",
          label: "Contact",
          url: "/contact",
          children: [],
        },
      ],
    },
  ]

// Placeholder data for pages
export const placeholderPages = [
    {
      id: "1",
      title: "Home",
      status: "published",
      lastUpdated: "2023-04-15",
      author: "John Doe",
    },
    {
      id: "2",
      title: "About Us",
      status: "published",
      lastUpdated: "2023-04-10",
      author: "Jane Smith",
    },
    {
      id: "3",
      title: "Services",
      status: "published",
      lastUpdated: "2023-04-05",
      author: "John Doe",
    },
    {
      id: "4",
      title: "Contact",
      status: "published",
      lastUpdated: "2023-04-01",
      author: "Jane Smith",
    },
    {
      id: "5",
      title: "Privacy Policy",
      status: "published",
      lastUpdated: "2023-03-28",
      author: "John Doe",
    },
    {
      id: "6",
      title: "Terms of Service",
      status: "published",
      lastUpdated: "2023-03-25",
      author: "Jane Smith",
    },
    {
      id: "7",
      title: "FAQ",
      status: "draft",
      lastUpdated: "2023-03-20",
      author: "John Doe",
    },
    {
      id: "8",
      title: "Careers",
      status: "draft",
      lastUpdated: "2023-03-15",
      author: "Jane Smith",
    },
  ]

  // Placeholder data for posts
export const placeholderPosts = [
    {
      id: "1",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js, the React framework for production.",
      content:
        "Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.",
      status: "published",
      category: "Tutorial",
      tags: ["nextjs", "react", "javascript"],
      date: "2023-04-15",
      author: "John Doe",
      featuredImage: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      title: "Introduction to Tailwind CSS",
      excerpt: "Discover how Tailwind CSS can help you build beautiful websites without writing custom CSS.",
      content:
        "Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",
      status: "published",
      category: "Tutorial",
      tags: ["css", "tailwind", "design"],
      date: "2023-04-10",
      author: "Jane Smith",
      featuredImage: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      title: "Building a REST API with Node.js",
      excerpt: "Learn how to create a RESTful API using Node.js, Express, and MongoDB.",
      content:
        "In this tutorial, we'll build a complete REST API from scratch using Node.js, Express, and MongoDB. You'll learn how to structure your project, handle requests, and connect to a database.",
      status: "draft",
      category: "Tutorial",
      tags: ["nodejs", "express", "mongodb", "api"],
      date: "2023-04-05",
      author: "John Doe",
      featuredImage: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      title: "The Future of Web Development",
      excerpt: "Explore the latest trends and technologies shaping the future of web development.",
      content:
        "The web development landscape is constantly evolving with new frameworks, tools, and methodologies. In this article, we explore emerging trends like WebAssembly, Edge Computing, and AI-driven development that are set to revolutionize how we build for the web.",
      status: "published",
      category: "Opinion",
      tags: ["future", "trends", "webdev"],
      date: "2023-04-01",
      author: "Jane Smith",
      featuredImage: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "5",
      title: "Optimizing Website Performance",
      excerpt: "Learn how to improve your website's speed and performance for better user experience.",
      content:
        "Website performance is crucial for user experience and SEO. This guide covers essential techniques for optimizing load times, reducing bundle sizes, and implementing caching strategies.",
      status: "published",
      category: "Tutorial",
      tags: ["performance", "optimization", "web"],
      date: "2023-03-28",
      author: "John Doe",
      featuredImage: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "6",
      title: "Introduction to TypeScript",
      excerpt: "Discover how TypeScript can improve your JavaScript development experience.",
      content:
        "TypeScript adds static typing to JavaScript, helping you catch errors early and making your code more maintainable. This introduction covers the basics and shows you how to get started.",
      status: "draft",
      category: "Tutorial",
      tags: ["typescript", "javascript", "programming"],
      date: "2023-03-25",
      author: "Jane Smith",
      featuredImage: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "7",
      title: "Responsive Design Best Practices",
      excerpt: "Learn how to create websites that look great on any device.",
      content:
        "Responsive design is essential in today's multi-device world. This article covers best practices for creating flexible layouts, responsive images, and mobile-friendly navigation.",
      status: "published",
      category: "Design",
      tags: ["responsive", "design", "css"],
      date: "2023-03-20",
      author: "John Doe",
      featuredImage: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "8",
      title: "Getting Started with React Hooks",
      excerpt: "Explore how React Hooks can simplify your functional components.",
      content:
        "React Hooks allow you to use state and other React features without writing a class. This tutorial introduces useState, useEffect, and other built-in hooks with practical examples.",
      status: "published",
      category: "Tutorial",
      tags: ["react", "hooks", "javascript"],
      date: "2023-03-15",
      author: "Jane Smith",
      featuredImage: "/placeholder.svg?height=100&width=100",
    },
  ]

export default function MenuBuilderPage() {
  const [activeMenu, setActiveMenu] = useState("main-menu")
  const [menuItems, setMenuItems] = useState(placeholderMenus.find((menu) => menu.id === activeMenu)?.items || [])

  const breadcrumbs = [
    { title: "Admin", href: "/admin" },
    { title: "Menu Builder", href: "/admin/menus" }
  ]

  const handleMenuChange = (menuId: string) => {
    setActiveMenu(menuId)
    setMenuItems(placeholderMenus.find((menu) => menu.id === menuId)?.items || [])
  }

  const addMenuItem = (type: string, item: any) => {
    const newItem = {
      id: `menu-item-${Date.now()}`,
      type,
      label: type === "custom" ? "New Link" : item.title || item.name,
      url: type === "custom" ? "#" : `/${type}/${item.id}`,
      children: [],
    }
    setMenuItems([...menuItems, newItem])
  }

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const moveItemUp = (index: number) => {
    if (index === 0) return
    const newItems = [...menuItems]
    const temp = newItems[index]
    newItems[index] = newItems[index - 1]
    newItems[index - 1] = temp
    setMenuItems(newItems)
  }

  const moveItemDown = (index: number) => {
    if (index === menuItems.length - 1) return
    const newItems = [...menuItems]
    const temp = newItems[index]
    newItems[index] = newItems[index + 1]
    newItems[index + 1] = temp
    setMenuItems(newItems)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Menu Builder" />
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold">Menus</h1>
                <p className="text-muted-foreground">Create and organize navigation menus for your site</p>
            </div>
                <Button>Save Menu</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4 space-y-6">
                <Card>
                <CardHeader>
                    <CardTitle>Menu Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="menu-select">Select Menu to Edit</Label>
                    <Select value={activeMenu} onValueChange={handleMenuChange}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select menu" />
                        </SelectTrigger>
                        <SelectContent>
                        {placeholderMenus.map((menu) => (
                            <SelectItem key={menu.id} value={menu.id}>
                            {menu.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="menu-name">Menu Name</Label>
                    <Input
                        id="menu-name"
                        defaultValue={placeholderMenus.find((menu) => menu.id === activeMenu)?.name || ""}
                        onChange={(e) => console.log("Menu name changed:", e.target.value)}
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="menu-location">Display Location</Label>
                    <Select defaultValue="header">
                        <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="header">Header Navigation</SelectItem>
                        <SelectItem value="footer">Footer Navigation</SelectItem>
                        <SelectItem value="sidebar">Sidebar Navigation</SelectItem>
                        <SelectItem value="mobile">Mobile Navigation</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="pt-2">
                    <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Menu
                    </Button>
                    </div>
                </CardContent>
                </Card>

                <Tabs defaultValue="pages">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pages">Pages</TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="custom">Custom Links</TabsTrigger>
                </TabsList>
                <TabsContent value="pages" className="border rounded-md mt-2">
                    <div className="p-4 space-y-4">
                    <div className="relative">
                        <Input placeholder="Search pages..." />
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {placeholderPages.map((page) => (
                        <div key={page.id} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="text-sm">{page.title}</div>
                            <Button size="sm" variant="ghost" onClick={() => addMenuItem("page", page)}>
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        ))}
                    </div>
                    </div>
                </TabsContent>
                <TabsContent value="posts" className="border rounded-md mt-2">
                    <div className="p-4 space-y-4">
                    <div className="relative">
                        <Input placeholder="Search posts..." />
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {placeholderPosts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="text-sm">{post.title}</div>
                            <Button size="sm" variant="ghost" onClick={() => addMenuItem("post", post)}>
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        ))}
                    </div>
                    </div>
                </TabsContent>
                <TabsContent value="custom" className="border rounded-md mt-2">
                    <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="link-text">Link Text</Label>
                        <Input
                        id="link-text"
                        placeholder="Menu Item Text"
                        onChange={(e) => console.log("Link text changed:", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="link-url">URL</Label>
                        <Input
                        id="link-url"
                        placeholder="https://example.com"
                        onChange={(e) => console.log("URL changed:", e.target.value)}
                        />
                    </div>
                    <Button onClick={() => addMenuItem("custom", { title: "New Link" })}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Menu
                    </Button>
                    </div>
                </TabsContent>
                </Tabs>
            </div>

            <div className="md:col-span-8">
                <Card>
                <CardHeader>
                    <CardTitle>Menu Structure</CardTitle>
                </CardHeader>
                <CardContent>
                    {menuItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        Your menu is empty. Add items from the left panel.
                    </div>
                    ) : (
                    <div className="space-y-2">
                        {menuItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-2 p-3 border rounded-md bg-card hover:bg-accent/50 transition-colors"
                        >
                            <div className="text-muted-foreground cursor-move">
                            <GripVertical className="h-5 w-5" />
                            </div>
                            <Accordion type="single" collapsible className="flex-1">
                            <AccordionItem value={item.id} className="border-none">
                                <div className="flex items-center">
                                {item.type === "page" && <FileText className="h-4 w-4 mr-2 text-muted-foreground" />}
                                {item.type === "post" && <FileText className="h-4 w-4 mr-2 text-muted-foreground" />}
                                {item.type === "custom" && <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />}
                                {item.type === "home" && <Home className="h-4 w-4 mr-2 text-muted-foreground" />}
                                <span className="font-medium">{item.label}</span>
                                <AccordionTrigger className="ml-auto" />
                                </div>
                                <AccordionContent>
                                <div className="space-y-3 pt-2">
                                    <div className="space-y-1">
                                    <Label htmlFor={`item-${item.id}-label`}>Navigation Label</Label>
                                    <Input
                                        id={`item-${item.id}-label`}
                                        defaultValue={item.label}
                                        onChange={(e) => {
                                        const updatedItems = [...menuItems]
                                        const itemIndex = updatedItems.findIndex((i) => i.id === item.id)
                                        if (itemIndex !== -1) {
                                            updatedItems[itemIndex] = { ...updatedItems[itemIndex], label: e.target.value }
                                            setMenuItems(updatedItems)
                                        }
                                        }}
                                    />
                                    </div>
                                    <div className="space-y-1">
                                    <Label htmlFor={`item-${item.id}-url`}>URL</Label>
                                    <Input
                                        id={`item-${item.id}-url`}
                                        defaultValue={item.url}
                                        onChange={(e) => {
                                        const updatedItems = [...menuItems]
                                        const itemIndex = updatedItems.findIndex((i) => i.id === item.id)
                                        if (itemIndex !== -1) {
                                            updatedItems[itemIndex] = { ...updatedItems[itemIndex], url: e.target.value }
                                            setMenuItems(updatedItems)
                                        }
                                        }}
                                    />
                                    </div>
                                    <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                        Open in new tab
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Add submenu item
                                    </Button>
                                    </div>
                                </div>
                                </AccordionContent>
                            </AccordionItem>
                            </Accordion>
                            <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => moveItemUp(index)} disabled={index === 0}>
                                <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => moveItemDown(index)}
                                disabled={index === menuItems.length - 1}
                            >
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeMenuItem(item.id)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </CardContent>
                </Card>
            </div>
            </div>
        </div>
    </AppLayout>
  )
}
