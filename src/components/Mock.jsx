import React, { useRef } from "react";
import { gsap } from "gsap";

const AwwwardsColumns = () => {
  const colRefs = useRef([]);
  const contentRefs = useRef([]);
  const imgRefs = useRef([]);

  const handleHover = (index) => {
    colRefs.current.forEach((col, i) => {
      if (i === index) {
        gsap.to(col, {
          flex: 2,
          duration: 0.8,
          ease: "expo.out"
        });

        // Content reveal animation
        gsap.fromTo(
          contentRefs.current[i],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 }
        );

        // Background image zoom
        gsap.to(imgRefs.current[i], {
          scale: 1.1,
          duration: 0.8,
          ease: "power3.out"
        });
      } else {
        gsap.to(col, {
          flex: 0.5,
          duration: 0.8,
          ease: "expo.out"
        });

        // Hide non-hovered content
        gsap.to(contentRefs.current[i], {
          opacity: 0,
          duration: 0.4,
          ease: "power3.in"
        });

        // Shrink their background images
        gsap.to(imgRefs.current[i], {
          scale: 1,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    });
  };

  const handleLeave = () => {
    colRefs.current.forEach((col, i) => {
      gsap.to(col, {
        flex: 1,
        duration: 0.8,
        ease: "expo.out"
      });

      gsap.to(contentRefs.current[i], {
        opacity: 0,
        duration: 0.4,
        ease: "power3.in"
      });

      gsap.to(imgRefs.current[i], {
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      });
    });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "sans-serif"
      }}
    >
      {[
        {
          title: "Creativity",
          color: "hsl(10, 70%, 50%)",
          img: "https://images.unsplash.com/photo-1503264116251-35a269479413"
        },
        {
          title: "Design",
          color: "hsl(200, 70%, 50%)",
          img: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
        },
        {
          title: "Innovation",
          color: "hsl(120, 70%, 40%)",
          img: "https://images.unsplash.com/photo-1506765515384-028b60a970df"
        }
      ].map((item, i) => (
        <div
          key={i}
          ref={(el) => (colRefs.current[i] = el)}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleLeave}
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            cursor: "pointer",
            background: item.color
          }}
        >
          {/* Background image layer */}
          <img
            ref={(el) => (imgRefs.current[i] = el)}
            src={item.img}
            alt={item.title}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              transform: "scale(1)",
              transition: "transform 0.3s ease"
            }}
          />

          {/* Overlay for better text contrast */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.35)",
              zIndex: 1
            }}
          />

          {/* Content */}
          <div
            ref={(el) => (contentRefs.current[i] = el)}
            style={{
              position: "relative",
              zIndex: 2,
              opacity: 0,
              color: "white",
              textAlign: "center",
              padding: "20px"
            }}
          >
            <h1 style={{ fontSize: "3rem", margin: 0 }}>{item.title}</h1>
            <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AwwwardsColumns;
