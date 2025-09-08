"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";
import { useContactModalStore } from "@/lib/zustand/stores";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhysicsContactButtons({
    containerRef,
}: {
    containerRef: React.RefObject<HTMLDivElement>;
}) {
    const toggleModal = useContactModalStore((state) => state.toggleModal);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;        const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } =
            Matter;

        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        const engine = Engine.create({
            gravity: { y: 1.5, scale: 0.001 },
        });

        const render = Render.create({
            element: containerRef.current,
            engine: engine,
            options: {
                width: containerWidth,
                height: containerHeight,
                background: "transparent",
                wireframes: false,
                pixelRatio: window.devicePixelRatio || 1,
            },
        });

        const ctaA = Bodies.rectangle(containerWidth * 0.2, -330, 407, 170, {
            friction: 0.3,
            frictionAir: 0.00001,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: "/images/other/cta-say-hiii.png",
                    xScale: 0.5,
                    yScale: 0.5,
                },
            },
            chamfer: { radius: 85 },
        });
        const ctaB = Bodies.rectangle(containerWidth * 0.4, -400, 549, 170, {
            friction: 0.3,
            frictionAir: 0.00001,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: "/images/other/cta-reach-out.png",
                    xScale: 0.5,
                    yScale: 0.5,
                },
            },
            chamfer: { radius: 85 },
        });
        const ctaC = Bodies.rectangle(containerWidth * 0.6, -200, 800, 170, {
            friction: 0.3,
            frictionAir: 0.00001,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: "/images/other/cta-send-a-message.png",
                    xScale: 0.5,
                    yScale: 0.5,
                },
            },
            chamfer: { radius: 85 },
        });
        const ctaD = Bodies.rectangle(containerWidth * 0.5, -250, 507, 170, {
            friction: 0.3,
            frictionAir: 0.00001,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: "/images/other/cta-lets-chat.png",
                    xScale: 0.5,
                    yScale: 0.5,
                },
            },
            chamfer: { radius: 85 },
        });
        const ctaE = Bodies.circle(containerWidth * 0.85, -260, 115, {
            friction: 0.3,
            frictionAir: 0.00001,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: "/images/other/cta-mail.png",
                    xScale: 0.5,
                    yScale: 0.5,
                },
            },
        });
        const ctaF = Bodies.circle(containerWidth * 0.1, -150, 115, {
            friction: 0.3,
            frictionAir: 0.00001,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: "/images/other/cta-message.png",
                    xScale: 0.5,
                    yScale: 0.5,
                },
            },
        });

        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } },
        });

        const interactiveBodies = [ctaA, ctaB, ctaC, ctaD, ctaE, ctaF];
        // Loose typing to avoid dependency on @types/matter-js during build
        let clickStartBody: any | null = null;
        let clickStartTime = 0;
        let isDragging = false;

        Events.on(mouseConstraint, "mousedown", (event: any) => {
            const mousePosition = event.mouse.position;
            clickStartBody = Matter.Query.point(interactiveBodies, mousePosition)[0];
            clickStartTime = Date.now();
            isDragging = false;
        });
        Events.on(mouseConstraint, "mousemove", (event: any) => {
            const mousePosition = event.mouse.position;
            const hoveredBody = Matter.Query.point(interactiveBodies, mousePosition)[0];
            render.canvas.style.cursor = hoveredBody ? "pointer" : "default";
            if (mouseConstraint.mouse.button === 0 && mouseConstraint.body) {
                isDragging = true;
            }
        });
        Events.on(mouseConstraint, "mouseup", (event: any) => {
            const mousePosition = event.mouse.position;
            const releasedBody = Matter.Query.point(interactiveBodies, mousePosition)[0];
            const clickDuration = Date.now() - clickStartTime;
            if (
                releasedBody &&
                releasedBody === clickStartBody &&
                !isDragging &&
                clickDuration < 300
            ) {
                toggleModal();
            }
            clickStartBody = null;
        });

        const wallThickness = 1;
        const ground = Bodies.rectangle(
            containerWidth / 2,
            containerHeight - wallThickness / 2,
            containerWidth,
            wallThickness,
            { isStatic: true, render: { fillStyle: "transparent" } }
        );
        const leftWall = Bodies.rectangle(
            wallThickness / 2,
            containerHeight / 2,
            wallThickness,
            containerHeight,
            { isStatic: true, render: { fillStyle: "transparent" } }
        );
        const rightWall = Bodies.rectangle(
            containerWidth - wallThickness / 2,
            containerHeight / 2,
            wallThickness,
            containerHeight,
            { isStatic: true, render: { fillStyle: "transparent" } }
        );
        const ceiling = Bodies.rectangle(
            containerWidth / 2,
            wallThickness / 2,
            containerWidth,
            wallThickness,
            { isStatic: true, render: { fillStyle: "transparent" } }
        );

        let bodiesAdded = false;
        const scrollTrigger = ScrollTrigger.create({
            trigger: containerRef.current!,
            start: "top 35%",
            onEnter: () => {
                if (!bodiesAdded) {
                    Composite.add(engine.world, [
                        ctaA,
                        ctaB,
                        ctaC,
                        ctaD,
                        ctaE,
                        ctaF,
                        mouseConstraint,
                        ground,
                        leftWall,
                        rightWall,
                    ]);
                    setTimeout(() => {
                        Composite.add(engine.world, ceiling);
                    }, 2000);
                    bodiesAdded = true;
                    scrollTriggerRef.current?.kill();
                }
            },
        });
        scrollTriggerRef.current = scrollTrigger;

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        function handleResize(containerRef: React.RefObject<HTMLDivElement>) {
            render.canvas.width = containerRef.current!.clientWidth;
            render.canvas.height = containerRef.current!.clientHeight;
            Matter.Body.setPosition(
                rightWall,
                Matter.Vector.create(
                    containerRef.current!.clientWidth + wallThickness / 2,
                    containerRef.current!.clientHeight / 2
                )
            );
        }
        window.addEventListener("resize", () => handleResize(containerRef));

        return () => {
            Events.off(mouseConstraint, "mousedown");
            Events.off(mouseConstraint, "mousemove");
            Events.off(mouseConstraint, "mouseup");
            Render.stop(render);
            Runner.stop(runner);
            Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
            scrollTriggerRef.current?.kill();
            window.removeEventListener("resize", () => handleResize(containerRef));
        };
  }, [containerRef, toggleModal]);

    return <div />;
}
